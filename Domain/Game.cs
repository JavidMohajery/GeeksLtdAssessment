using System;
using System.Collections.Generic;
using System.Linq;

namespace Domain
{
    public class Game
    {
        private const int POINT_VALUE = 12;
        private const int PENALTY_VALUE = -5;
        private List<int> alreadyGeneratedCandidates = new List<int>();

        public int TotalPoints { get; set; }
        private Nationality GuessedNationality { get; set; }
        public Nationality ActualNationality { get; set; }
        public Candidate Candidate { get; set; }
        public int RoundNumber { get; set; }


        public void GenerateCandidate()
        {
            int id = GeneraterandomCandidateId();
            Candidate = CandidateCollection.Candidates.ElementAt(id);

            ActualNationality = NationalityCollection.Nationalities.Single(n => n.Id == Candidate.Nationality);
        }

        public void Guess(int id)
        {
            GuessedNationality = NationalityCollection.Nationalities.SingleOrDefault(x => x.Id == id);
        }

        public bool AssessGuess()
        {
            RoundNumber++;

            if (GuessedNationality == ActualNationality)
            {
                AddPoint();
                return true;
            }
            else
            { 
                SubtractPenalty();
                return false;
            }
        }

        public bool IsOver => RoundNumber >= 10;

        private int GeneraterandomCandidateId()
        {
            int id = new Random().Next(0, CandidateCollection.Candidates.Count);
            if (!alreadyGeneratedCandidates.Contains(id)) { 
                alreadyGeneratedCandidates.Add(id);
                return id;
            }
            return GeneraterandomCandidateId();
            
        }
        private void AddPoint()
        {
            TotalPoints += POINT_VALUE;
        }
        private void SubtractPenalty()
        {
            TotalPoints += PENALTY_VALUE;
        }
    }
}

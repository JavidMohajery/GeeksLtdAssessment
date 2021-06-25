using System.Collections.Generic;

namespace Domain
{
    public class CandidateCollection
    {
        public static List<Candidate> Candidates { get; set; } = new List<Candidate>
        {
            new Candidate{Id = 1, Name = "Eichi", Image = "Eichi.png", Nationality = 1 },
            new Candidate{Id = 2, Name = "Kentaro", Image = "Kentaro.jpg", Nationality = 1 },
            new Candidate{Id = 3, Name = "Masanori", Image = "Masanori.jpg", Nationality = 1 },

            new Candidate{Id = 4, Name = "Boqin", Image = "Boqin.jpg", Nationality = 2 },
            new Candidate{Id = 5, Name = "Bai", Image = "Bai.jpg", Nationality = 2 },
            new Candidate{Id = 6, Name = "Bojin", Image = "Bojin.jpg", Nationality = 2 },
            new Candidate{Id = 7, Name = "Aigou", Image = "Aigou.jpg", Nationality = 2 },

            new Candidate{Id = 8, Name = "Beom-soo", Image = "Beom-soo.jpg", Nationality = 3 },
            new Candidate{Id = 9, Name = "Hyun-woo", Image = "Hyun-woo.jpg", Nationality = 3 },
            new Candidate{Id = 10,Name = "Dong-gun", Image = "Dong-gun.jpg", Nationality = 3 },

            new Candidate{Id = 11,Name = "Kanchana", Image = "Kanchana.jpg", Nationality = 4 },
            new Candidate{Id = 12,Name = "Lawan", Image = "Lawan.jpg", Nationality = 4 },
            new Candidate{Id = 13,Name = "Somchai", Image = "Somchai.jpg", Nationality = 4 }
        };
    }
}

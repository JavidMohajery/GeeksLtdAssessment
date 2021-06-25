using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace TestGame
{
    public class GameTest
    {


        [Fact]
        public void WhenGuessTrue_PointWillAddBy12_Else_WouldBeNegative5()
        {
            Game game = new Game();
            game.GenerateCandidate();
            game.Guess(2);
            var result = game.AssessGuess() ? 12 : -5;
            Assert.Equal(game.TotalPoints, result);
        }
        [Fact]
        public void AfterAllRounds_GameIsOver()
        {
            int count = 0;
            Game game = new Game();
            while (count <= 10)
            {
                game.GenerateCandidate();
                game.Guess(2);
                game.AssessGuess();
                count++;
            }
            
            Assert.Equal(game.IsOver, true);
        }
        [Fact]
        public void BeforeAllRounds_GameIsNotOver()
        {
            int count = 0;
            Game game = new Game();
            while (count <= 10)
            {
                game.GenerateCandidate();
                game.Guess(2);
                game.AssessGuess();
                count++;
                if (count == 7) break;
            }

            Assert.Equal(game.IsOver, false);
        }
    }
}

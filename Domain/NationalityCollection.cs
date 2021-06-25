using System.Collections.Generic;
using System.Linq;

namespace Domain
{
    public class NationalityCollection
    {
        public static List<Nationality> Nationalities { get; set; } =
            new List<Nationality>
            {
                new Nationality{Id = 1, Name="Japanese"},
                new Nationality{Id = 2, Name="Chinese"},
                new Nationality{Id = 3, Name="Korean"},
                new Nationality{Id = 4, Name="Thai"},
            };
        public Nationality ChooseNationality(int id)
        {
            return Nationalities.Single(x => x.Id == id);
        }
    }
}

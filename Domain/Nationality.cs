using System;

namespace Domain
{
    public class Nationality : IEquatable<Nationality>
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public bool Equals(Nationality other)
        {
            if (other == null) return false;
            return this.Id == other.Id && this.Name == other.Name;
        }
    }
}

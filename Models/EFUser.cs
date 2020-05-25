using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace learn.Models
{
    [Table("EFUSER")]
    public class EFUser
    {
        [Column("USER_ID")]
        public int Id { get; set; }

        [Column("USER_NAME")]
        public string Name { get; set; }

        [Column("USER_AGE")]
        public int Age { get; set; }

        [Column("CREATION_DATE")]
        public DateTime CreationDate { get; set; }
        
    }
}
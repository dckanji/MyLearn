using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace learn.Models
{
    [Table("EFUser")]
    public class EFUser
    {
        [Key]
        public int UserId { get; set; }
        public string UserName { get; set; }
        //public int UserAge { get; set; }
        public DateTime CreationDate { get; set; }
        
    }
}
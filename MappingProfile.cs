using System.Security.Cryptography;
using System;
using System.Linq;
using AutoMapper;
using learn.Models;

/*
建立物件MAPPING 設定檔
*/
namespace learn
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<string, bool>().ConvertUsing(s => s == "Y");
            CreateMap<bool, string>().ConvertUsing(b => b ? "Y" : "N");
            //設定物件對應..左邊為來源EFUser...右邊為目標EFUserForEditMapper
            //實際使用則為 _mapper.Map<EFUserForEditMapper>(EFUser);
            CreateMap<EFUser, EFUserForEditMapper>();
            CreateMap<EFUserForEditMapper, EFUser>();

            CreateMap<EFUser, EFUserForEdit>();
            CreateMap<EFUserForEdit, EFUser>();

        }
    }

}
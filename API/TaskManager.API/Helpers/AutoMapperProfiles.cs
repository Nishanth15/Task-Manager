using AutoMapper;
using System;
using TaskManager.API.DTOs;
using TaskManager.Model;

namespace TaskManager.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Project, ProjectResponse>()
                .ForMember(dest => dest.ParentId, opt => opt.MapFrom(src => Guid.Parse(src.ParentId)));
            CreateMap<ProjectRequest, Project>()
                .ForMember(dest => dest.ParentId, opt => opt.MapFrom(src => src.ParentId.ToString()));
        }
    }
}

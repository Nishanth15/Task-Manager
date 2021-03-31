using AutoMapper;
using TaskManager.API.DTOs;
using TaskManager.Model;

namespace TaskManager.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Project, ProjectResponse>();
            CreateMap<ProjectRequest, Project>();
            CreateMap<Section, SectionResponse>();
            CreateMap<SectionRequest, Section>();
            CreateMap<Item, ItemResponse>();
            CreateMap<ItemRequest, Item>();

        }
    }
}

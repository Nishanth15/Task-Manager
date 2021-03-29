using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TaskManager.API.DTOs;

namespace TaskManager.API.Services.Interfaces
{
    public interface ISectionService
    {
        Task<IEnumerable<SectionResponse>> GetSectionsAsync();
        Task<SectionResponse> GetSectionAsync(Guid id);
        Task<SectionResponse> AddSectionAsync(SectionRequest sectionRequest);
        Task<SectionResponse> UpdateSectionAsync(Guid id, SectionRequest sectionRequest);
        Task<BaseResponse> RemoveSectionAsync(Guid id);

    }
}

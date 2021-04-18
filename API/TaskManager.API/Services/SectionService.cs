using AutoMapper;
using TaskManager.API.Common.Constants;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManager.API.DTOs;
using TaskManager.API.Services.Interfaces;
using TaskManager.DataManager.Interfaces;
using TaskManager.Model;

namespace TaskManager.API.Services
{
    public class SectionService : ISectionService
    {
        private readonly IGenericRepository<Section> _repo;
        private readonly IMapper _mapper;

        public SectionService(IGenericRepository<Section> repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task<IEnumerable<SectionResponse>> GetSectionsAsync()
        {
            var sectionList = await _repo.GetAllAsync();
            var sectionResponseList = new List<SectionResponse>();

            sectionList.ToList().ForEach(section =>
            {
                var sectionResponse = _mapper.Map<Section, SectionResponse>(section);

                sectionResponseList.Add(sectionResponse);

            });

            return sectionResponseList;
        }

        public async Task<SectionResponse> GetSectionAsync(Guid id)
        {
            var section = await _repo.GetAsync(id);
            var sectionResponse = new SectionResponse();

            if(section ==  null)
            {
                sectionResponse.Success = true;
                sectionResponse.Message = Constants.SectionNotFound;
            }
            else
            {
                sectionResponse = _mapper.Map<Section, SectionResponse>(section);
            }

            return sectionResponse;
        }

        public async Task<SectionResponse> AddSectionAsync(SectionRequest sectionRequest)
        {
            var section = _mapper.Map<SectionRequest, Section>(sectionRequest);
            section.IsArchived = false;
            section.IsDeleted = false;
            section.CreatedAt = DateTime.Now;
            section.Modified = DateTime.Now;

            section = await _repo.AddAsync(section);

            var sectionResponse = _mapper.Map<Section, SectionResponse>(section);
            sectionResponse.Message = Constants.SectionAddedSuccessfully;

            return sectionResponse;
        }

        public async Task<SectionResponse> UpdateSectionAsync(Guid id, SectionRequest sectionRequest)
        {
            var section = _mapper.Map<SectionRequest, Section>(sectionRequest);
            section.Id = id;
            section.Modified = DateTime.Now;

            section = await _repo.UpdateAsync(section);

            return _mapper.Map<Section, SectionResponse>(section);
        }

        public async Task<SectionResponse> CollapseSectionAsync(Guid id, int Collapsed)
        {
            var Section = await _repo.GetAsync(id);
            Section.Id = id;
            Section.Collapsed = Collapsed;

            Section = await _repo.UpdateCollapseAsync(Section);

            var sectionResponse = _mapper.Map<Section, SectionResponse>(Section);
            sectionResponse.Success = true;

            return sectionResponse;
        }

        public async Task<BaseResponse> RemoveSectionAsync(Guid id)
        {
            var sectionResponse = new BaseResponse();

            bool isDeleted = await MarkSectionAsDeleted(id);

            if (isDeleted)
            {
                sectionResponse.Success = true;
                sectionResponse.Message = Constants.SectionDeletedSuccessfully;
            }
            return sectionResponse;
        }

        private async Task<bool> MarkSectionAsDeleted(Guid id)
        {
            var section = await _repo.GetAsync(id);
            section.IsDeleted = true;

            section = await _repo.UpdateAsync(section);

            if (section == null)
                return false;
            else
                return true;
        }
    }
}

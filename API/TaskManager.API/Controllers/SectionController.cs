using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TaskManager.API.DTOs;
using TaskManager.API.Services.Interfaces;


namespace TaskManager.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SectionController : BaseController
    {
        private readonly ISectionService _service;

        public SectionController(ISectionService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SectionResponse>>> Get()
        {
            var sections = await _service.GetSectionsAsync();
            return Ok(sections);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SectionResponse>> Get(Guid id)
        {
            var section = await _service.GetSectionAsync(id);
            return Ok(section);
        }

        [HttpPost]
        public async Task<ActionResult<SectionResponse>> Post(SectionRequest sectionRequest)
        {
            var section = await _service.AddSectionAsync(sectionRequest);
            return Ok(section);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<SectionResponse>> Put(Guid id, SectionRequest sectionRequest)
        {
            var section = await _service.UpdateSectionAsync(id, sectionRequest);
            return Ok(section);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<BaseResponse>> Delete(Guid id)
        {
            var section = await _service.RemoveSectionAsync(id);
            return Ok(section);
        }

        [HttpPut("Collapse")]
        public async Task<ActionResult<SectionResponse>> CollapseSection(Guid id, int Collapsed)
        {
            var project = await _service.CollapseSectionAsync(id, Collapsed);
            return Ok(project);
        }

        [HttpPost("Move")]
        public async Task<ActionResult<SectionResponse>> MoveProjectAsync(MoveSectionRequest moveSectionRequest)
        {
            var section = await _service.MoveSectionAsync(moveSectionRequest);
            return Ok(section);
        }
    }
}

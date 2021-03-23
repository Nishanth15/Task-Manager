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
    public class SectionController : ControllerBase
    {
        private readonly ISectionService _service;

        public SectionController(ISectionService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SectionResponse>>> Get()
        {
            var project = await _service.GetSectionsAsync();
            return Ok(project);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SectionResponse>> Get(Guid id)
        {
            var project = await _service.GetSectionAsync(id);
            return Ok(project);
        }

        [HttpPost]
        public async Task<ActionResult<SectionResponse>> Post(SectionRequest sectionRequest)
        {
            var project = await _service.AddSectionAsync(sectionRequest);
            return Ok(project);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<SectionResponse>> Put(Guid id, SectionRequest sectionRequest)
        {
            var project = await _service.UpdateSectionAsync(id, sectionRequest);
            return Ok(project);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<SectionResponse>> Delete(Guid id)
        {
            var project = await _service.RemoveSectionAsync(id);
            return Ok(project);
        }
    }
}

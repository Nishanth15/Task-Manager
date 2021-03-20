using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManager.API.DTOs;
using TaskManager.API.Services.Interfaces;
using TaskManager.Model;

namespace TaskManager.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectService _service;

        public ProjectController(IProjectService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectResponseDTO>>> Get()
        {
            var project = await _service.GetProjectsAsync();
            return Ok(project);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectResponseDTO>> Get(Guid id)
        {
            var project = await _service.GetProjectAsync(id);
            return Ok(project);
        }

        [HttpPost]
        public async Task<ActionResult<ProjectResponseDTO>> Post(ProjectRequestDTO projectRequest)
        {
            var project = await _service.AddProjectAsync(projectRequest);
            return Ok(project);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ProjectResponseDTO>> Put(Guid id, ProjectRequestDTO projectRequest)
        {
            var project = await _service.UpdateProjectAsync(id, projectRequest);
            return Ok(project);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ProjectResponseDTO>> Delete(Guid id)
        {
            var project = await _service.RemoveProjectAsync(id);
            return Ok(project);
        }
    }
}

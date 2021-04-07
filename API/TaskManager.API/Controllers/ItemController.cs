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
    public class ItemController : ControllerBase
    {
        private readonly IItemService _service;

        public ItemController(IItemService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ItemResponse>>> Get()
        {
            var items = await _service.GetItemsAsync();
            return Ok(items);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ItemResponse>> Get(Guid id)
        {
            var item = await _service.GetItemAsync(id);
            return Ok(item);
        }

        [HttpPost]
        public async Task<ActionResult<ItemResponse>> Post(ItemRequest itemRequest)
        {
            var item = await _service.AddItemAsync(itemRequest);
            return Ok(item);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ItemResponse>> Put(Guid id, ItemRequest itemRequest)
        {
            var item = await _service.UpdateItemAsync(id, itemRequest);
            return Ok(item);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<BaseResponse>> Delete(Guid id)
        {
            var item = await _service.RemoveItemAsync(id);
            return Ok(item);
        }

        [Route("Collapse")]
        [HttpPut]
        public async Task<ActionResult<ItemResponse>> CollapseItem(Guid id, int Collapsed)
        {
            var project = await _service.CollapseItemAsync(id, Collapsed);
            return Ok(project);
        }
    }
}

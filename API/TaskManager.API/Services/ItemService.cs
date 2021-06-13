using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManager.API.Common.Constants;
using TaskManager.API.DTOs;
using TaskManager.API.Services.Interfaces;
using TaskManager.DataManager.Interfaces;
using TaskManager.Model;

namespace TaskManager.API.Services
{
    public class ItemService : IItemService
    {
        private readonly IGenericRepository<Item> _repo;
        private readonly IMapper _mapper;

        public ItemService(IGenericRepository<Item> repo, IMapper mapper )
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ItemResponse>> GetItemsAsync()
        {
            var itemList = await _repo.GetAllAsync();
            var itemResponseList = new List<ItemResponse>();

            itemList.ToList().ForEach(item =>
            {
                var itemResponse = _mapper.Map<Item, ItemResponse>(item);

                itemResponseList.Add(itemResponse);
            });

            return itemResponseList;
        }

        public async Task<ItemResponse> GetItemAsync(Guid id)
        {
            var item = await _repo.GetAsync(id);
            var itemResponse = new ItemResponse();

            if (item == null)
            {
                itemResponse.Success = true;
                itemResponse.Message = Constants.ItemNotFound;
            }
            else
            {
                itemResponse = _mapper.Map<Item, ItemResponse>(item);
            }

            return itemResponse;
        }

        public async Task<ItemResponse> AddItemAsync(ItemRequest itemRequest)
        {
            var item = _mapper.Map<ItemRequest, Item>(itemRequest);
            item.IsDeleted = false;
            item.AddedBy = itemRequest.UserId;
            item.UserId = itemRequest.UserId;
            item.CreatedAt = DateTime.Now;
            item.Modified = DateTime.Now;

            item = await _repo.AddAsync(item);

            return _mapper.Map<Item, ItemResponse>(item);

        }

        public async Task<ItemResponse> UpdateItemAsync(Guid id, ItemRequest itemRequest)
        {
            var item = _mapper.Map<ItemRequest, Item>(itemRequest);
            item.Id = id;
            item.Modified = DateTime.Now;

            item = await _repo.UpdateAsync(item);

            return _mapper.Map<Item, ItemResponse>(item);
        }

        public async Task<ItemResponse> CollapseItemAsync(Guid id, int Collapsed)
        {
            var item = await _repo.GetAsync(id);
            item.Id = id;
            item.Collapsed = Collapsed;

            item = await _repo.UpdateCollapseAsync(item);

            var itemResponse = _mapper.Map<Item, ItemResponse>(item);
            itemResponse.Success = true;

            return itemResponse;
        }

        public async Task<BaseResponse> RemoveItemAsync(Guid id)
        {
            var itemResponse = new BaseResponse();

            bool isDeleted = await MarkItemAsDeleted(id);

            if (isDeleted)
            {
                itemResponse.Success = true;
                itemResponse.Message = Constants.ItemDeletedSuccessfully;
            }
            return itemResponse;
        }

        public async Task<ItemResponse> MoveItemAsync(MoveItemRequest moveItemRequest)
        {
            ItemResponse itemResponse = new ItemResponse()
            {
                Success = false
            };
            Item item = await _repo.GetAsync(moveItemRequest.Id);

            item.SectionId = moveItemRequest.SectionId;
            item.ProjectId = moveItemRequest.ProjectId == null ? Guid.Empty:moveItemRequest.ProjectId.Value;
            item.ParentId = moveItemRequest.ParentId;

            item = await _repo.MoveAsync(item);

            if(item!=null)
            {
                itemResponse = _mapper.Map<Item, ItemResponse>(item);
            }

            return itemResponse;
        }

        public async Task<ItemResponse> CompleteItemAsync(Guid itemId)
        {
            ItemResponse itemResponse = new ItemResponse()
            {
                Success = false
            };
            var item = await _repo.CompleteItemAsync(itemId);

            if(item!=null)
            {
                itemResponse = _mapper.Map<Item,ItemResponse>(item);
            }
            else
            {
                itemResponse.Message = Constants.CannotCompleteTask;
            }

            return itemResponse;
        }

        public async Task<ItemResponse> UnCompleteItemAsync(Guid itemId)
        {
            ItemResponse itemResponse = new ItemResponse()
            {
                Success = false
            };
            var item = await _repo.UnCompleteItemAsync(itemId);

            if (item != null)
            {
                itemResponse = _mapper.Map<Item, ItemResponse>(item);
            }
            else
            {
                itemResponse.Message = Constants.CannotUnCompleteTask;
            }

            return itemResponse;
        }

        private async Task<bool> MarkItemAsDeleted(Guid id)
        {
            var item = await _repo.GetAsync(id);
            item.IsDeleted = true;

            item = await _repo.UpdateAsync(item);

            if (item == null)
                return false;
            else
                return true;
        }
    }
}

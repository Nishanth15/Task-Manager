﻿using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TaskManager.API.DTOs;

namespace TaskManager.API.Services.Interfaces
{
    public interface IItemService
    {
        Task<IEnumerable<ItemResponse>> GetItemsAsync();
        Task<ItemResponse> GetItemAsync(Guid id);
        Task<ItemResponse> AddItemAsync(ItemRequest itemRequest);
        Task<ItemResponse> UpdateItemAsync(Guid id, ItemRequest itemRequest);
        Task<BaseResponse> RemoveItemAsync(Guid id);
        Task<ItemResponse> MoveItemAsync(MoveItemRequest moveItemRequest);
        Task<ItemResponse> CollapseItemAsync(Guid id, int Collapsed);
        Task<ItemResponse> UnCompleteItemAsync(Guid itemId);
        Task<ItemResponse> CompleteItemAsync(Guid itemId);

    }
}

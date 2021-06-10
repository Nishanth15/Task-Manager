using System;
using System.Collections.Generic;

namespace TaskManager.API.DTOs
{
    public class ProjectRequest
    {
        public string Name { get; set; }
        public ProjectColor Color { get; set; }
        public ViewType ViewType { get; set; }
        public Guid? ParentId { get; set; }
        public bool IsFavorite { get; set; }
    }


    public class ProjectResponse : BaseResponse
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public ProjectColor Color { get; set; }
        public ViewType ViewType { get; set; }
        public Guid? ParentId { get; set; }
        public int Order { get; set; }
        public bool IsInbox { get; set; }
        public int Collapsed { get; set; }

    }

    public class ProjectData
    {
        public List<SectionResponse> Sections { get; set; }
        public List<ItemResponse> Items { get; set; }
    }

    public class ProjectDataResponse : BaseResponse
    {
        public ProjectData ProjectData { get; set; }
    }

    public enum ViewType
    {
        List,
        Board
    }

    public enum ProjectColor
    {
        Red,
        Green,
        Blue,
        Grey,
        Orange,
        Purple,
        Black,
        Yellow,
        Pink
    }

}

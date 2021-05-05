using System;

namespace TaskManager.API.DTOs
{
    public class ProjectRequest
    {
        public string Name { get; set; }
        public ProjectColor Color { get; set; }
        public ViewType ViewType { get; set; }
        public string ParentId { get; set; }
        public bool IsFavorite { get; set; }
    }


    public class ProjectResponse : BaseResponse
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public ProjectColor Color { get; set; }
        public ViewType ViewType { get; set; }
        public string ParentId { get; set; }
        public int Order { get; set; }
        public bool IsInbox { get; set; }
        public int Collapsed { get; set; }

    }

    public enum ViewType
    {
        List,
        Board
    }

    public enum ProjectColor
    {
        Red,
        Blue,
        Green,
        Black,
        Purple,
        Orange,
        Yellow,
        Pink
    }

}

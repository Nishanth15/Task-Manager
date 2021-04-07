using System;

namespace TaskManager.Model
{
    public class BaseModel
    {
        public Guid Id { get; set; }
    }

    public class CollapseModel
    {
        public int Collapsed { get; set; }
    }
}

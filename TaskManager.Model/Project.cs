﻿using System;

namespace TaskManager.Model
{
    public class Project
    {
        public Guid Id { get; set; }
        public string Name{ get; set; }
        public int Color { get; set; }
        public int ViewType { get; set; }

    }

    public enum ViewType
    {
        List,
        Board
    }

    public enum ProjectColor
    {
        Black,
        Blue,
        Red,
        Green
    }

}

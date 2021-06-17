export const sortBySectionOrder = (sections, items) => {
    // console.log(sections);
    // console.log(items);
    var sortedItemsByOrder = items.sort((a, b) =>
        a.order !== b.order ? (a.order < b.order ? -1 : 1) : 0
    );
    var sortedItemsBySectionId = [];
    sections.forEach((section) => {
        sortedItemsByOrder.forEach(
            (item) =>
                item.sectionId === section.id &&
                sortedItemsBySectionId.push(item)
        );
        // console.log(sortedItemsBySectionId);
    });
    return sortedItemsBySectionId;
};

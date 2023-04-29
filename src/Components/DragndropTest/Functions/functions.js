export function changeFolderItem(item, list, setList, newFolder) {
  // console.log("changeFolderItem");
  // console.log("item", item);
  // console.log("key", key);
  console.log("list", list);
  // console.log("newFolder", newFolder);
  // console.log("monitor", monitor);

  const indexItem = list.findIndex((el) => el.id === item.item.id);
  // console.log(indexItem);
  if (indexItem !== -1) {
    const newList = [...list];
    newList[indexItem].folder = newFolder;
    console.log("newList", newList);
    setList(newList);
  }
}

export function prepareData(rooms) {
  return rooms.map(mapRoons);
}

function mapRoons(item, index, arr) {
  const blockLength = arr.filter((i) => i.num === item.num).length;

  const blockNum =
    arr.filter((i) => i.num === item.num && i.main > 0).length > 0
      ? item.num
      : null;

  let rowStyle = "common";

  if (blockNum && index === 0) {
    rowStyle = "block__first";
  } else if (blockNum && arr[index - 1].num !== item.num) {
    rowStyle = "block__first";
  } else if (blockNum) {
    rowStyle = "block";
  }

  return {
    num: item.num,
    letter: item.letter,
    label: item.label,
    desc: item.desc,
    main: item.main === 0 ? null : item.main,
    secondary: item.secondary === 0 ? null : item.secondary,
    summer: item.summer === 0 ? null : item.summer,
    block: blockNum,
    rowStyle: rowStyle,
    rowSpawn: rowStyle === "block__first" ? blockLength : 0,
    areaLiving: arr
      .filter((i) => i.num === item.num)
      .reduce((acc, cur) => acc + cur.main, 0),
  };
}

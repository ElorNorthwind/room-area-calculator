export function updateRoomsInfo(rooms) {
  const sMainSum = rooms.reduce((acc, cur) => acc + cur.sMain, 0);
  const sCommonSecondarySum = rooms
    .filter((i) => !i.blockNum)
    .reduce((acc, cur) => acc + cur.sSecondary, 0);
  const sCommonSummerSum = rooms
    .filter((i) => !i.blockNum)
    .reduce((acc, cur) => acc + cur.sSecondary, 0);

  const mapRooms = (item, index, arr) => {
    const blockLength = arr.filter((i) => i.blockNum === item.blockNum).length;

    let rowStyle = "common";
    if (
      item.blockNum &&
      (index === 0 || arr[index - 1].blockNum !== item.blockNum)
    ) {
      rowStyle = "block__first";
    } else if (item.blockNum) {
      rowStyle = "block";
    }

    const sBlockMainSum = arr
      .filter((i) => i.blockNum === item.blockNum)
      .reduce((acc, cur) => acc + cur.sMain, 0);

    const sBlockSecondarySum = arr
      .filter((i) => i.blockNum === item.blockNum)
      .reduce((acc, cur) => acc + cur.sSecondary, 0);

    const sBlockSummerSum = arr
      .filter((i) => i.blockNum === item.blockNum)
      .reduce((acc, cur) => acc + cur.sSummer, 0);

    const sBlockShare = sBlockMainSum / sMainSum;

    const sBlockObsh =
      sBlockShare * sCommonSecondarySum + sBlockMainSum + sBlockSecondarySum;

    const sBlockZhP =
      sBlockObsh + sBlockSummerSum + sBlockShare * sCommonSummerSum;

    return {
      ...item,
      rowStyle: rowStyle,
      rowSpawn: rowStyle === "block__first" ? blockLength : 0,
      sBlockMainSum,
      sBlockObsh,
      sBlockZhP,
      formated: {
        sMain: sFormat(item.sMain),
        sSecondary: sFormat(item.sSecondary),
        sSummer: sFormat(item.sSummer),
        sBlockMainSum: sFormat(sBlockMainSum),
        sBlockObsh: sFormat(sBlockObsh),
        sBlockZhP: sFormat(sBlockZhP),
      },
    };
  };

  return rooms.map(mapRooms);
}

function sFormat(s) {
  return s === 0 ? null : s.toFixed(1);
}

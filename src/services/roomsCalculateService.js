// export function updateRoomsInfo(rooms) {
//   const sMainSum = rooms.reduce((acc, cur) => acc + cur.sMain, 0);
//   const sCommonSecondarySum = rooms
//     .filter((i) => !i.blockNum)
//     .reduce((acc, cur) => acc + cur.sSecondary, 0);
//   const sCommonSummerSum = rooms
//     .filter((i) => !i.blockNum)
//     .reduce((acc, cur) => acc + cur.sSecondary, 0);

//   const mapRooms = (item, index, arr) => {
//     const blockLength = arr.filter((i) => i.blockNum === item.blockNum).length;

//     let rowStyle = "common";
//     if (
//       item.blockNum &&
//       (index === 0 || arr[index - 1].blockNum !== item.blockNum)
//     ) {
//       rowStyle = "block__first";
//     } else if (item.blockNum) {
//       rowStyle = "block";
//     }

//     const sBlockMainSum = arr
//       .filter((i) => i.blockNum === item.blockNum)
//       .reduce((acc, cur) => acc + cur.sMain, 0);

//     const sBlockSecondarySum = arr
//       .filter((i) => i.blockNum === item.blockNum)
//       .reduce((acc, cur) => acc + cur.sSecondary, 0);

//     const sBlockSummerSum = arr
//       .filter((i) => i.blockNum === item.blockNum)
//       .reduce((acc, cur) => acc + cur.sSummer, 0);

//     const sBlockShare = sBlockMainSum / sMainSum;

//     const sBlockObsh =
//       sBlockShare * sCommonSecondarySum + sBlockMainSum + sBlockSecondarySum;

//     const sBlockZhP =
//       sBlockObsh + sBlockSummerSum + sBlockShare * sCommonSummerSum;

//     console.log(sBlockObsh, sBlockZhP);

//     return {
//       ...item,
//       rowStyle: rowStyle,
//       rowSpawn: rowStyle === "block__first" ? blockLength : 0,
//       sBlockMainSum,
//       sBlockObsh,
//       sBlockZhP,
//       formated: {
//         sMain: sFormat(item.sMain),
//         sSecondary: sFormat(item.sSecondary),
//         sSummer: sFormat(item.sSummer),
//         sBlockMainSum: sFormat(sBlockMainSum),
//         sBlockObsh: sFormat(sBlockObsh),
//         sBlockZhP: sFormat(sBlockZhP),
//       },
//     };
//   };

//   return rooms.map(mapRooms);
// }

function sFormat(s) {
  return s === 0 ? null : s.toFixed(1);
}

export function initialSortRooms(a, b) {
  if (a.num === b.num) {
    return a.letter < b.letter ? -1 : 1;
  } else {
    return a.num < b.num ? -1 : 1;
  }
}

export function roomsToBlocks(rooms) {
  let blocks = [];
  let commonBlock = 1;
  let npp = 0;
  rooms.sort(initialSortRooms).forEach((room) => {
    const block = !!room.blockNum ? room.blockNum : "comm_" + commonBlock;

    const inBlocks = (element) => element.blockNum === block;
    const blockIndex = blocks.findIndex(inBlocks);

    if (!!room.blockNum && blockIndex === -1) {
      commonBlock++;
      npp++;
    } else if (blockIndex === -1) {
      npp++;
    }

    blockIndex === -1
      ? blocks.push({
          npp,
          blockNum: block,
          type: !!room.blockNum ? "main" : "secondary",
          rooms: [
            {
              ...room,
              sMain: sFormat(room.sMain),
              sSecondary: sFormat(room.sSecondary),
              sSummer: sFormat(room.sSummer),
            },
          ],
        })
      : blocks[blockIndex].rooms.push({
          ...room,
          sMain: sFormat(room.sMain),
          sSecondary: sFormat(room.sSecondary),
          sSummer: sFormat(room.sSummer),
        });
  });
  blocks = saturateBlocks(rooms, blocks);
  return blocks;
}

function saturateBlocks(rooms, blocks) {
  const sMainSum = rooms.reduce((acc, cur) => acc + cur.sMain, 0);
  const sCommonSecondarySum = rooms
    .filter((i) => !i.blockNum)
    .reduce((acc, cur) => acc + cur.sSecondary, 0);
  const sCommonSummerSum = rooms
    .filter((i) => !i.blockNum)
    .reduce((acc, cur) => acc + cur.sSecondary, 0);

  function addAreaInfo(item) {
    const sBlockMainSum = rooms
      .filter((i) => i.blockNum === item.blockNum)
      .reduce((acc, cur) => acc + cur.sMain, 0);
    const sBlockSecondarySum = rooms
      .filter((i) => i.blockNum === item.blockNum)
      .reduce((acc, cur) => acc + cur.sSecondary, 0);
    const sBlockSummerSum = rooms
      .filter((i) => i.blockNum === item.blockNum)
      .reduce((acc, cur) => acc + cur.sSummer, 0);
    const sBlockShare = sBlockMainSum / sMainSum;
    const sBlockObsh =
      sBlockShare * sCommonSecondarySum + sBlockMainSum + sBlockSecondarySum;
    const sBlockZhP =
      sBlockObsh + sBlockSummerSum + sBlockShare * sCommonSummerSum;

    return {
      ...item,
      sBlockMainSum: sFormat(sBlockMainSum),
      sBlockObsh: sFormat(sBlockObsh),
      sBlockZhP: sFormat(sBlockZhP),
    };
  }

  return blocks.map(addAreaInfo);
}

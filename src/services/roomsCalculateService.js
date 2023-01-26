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
  console.log(blocks);
  return blocks;
}

function saturateBlocks(rooms, blocks) {
  const sMainSum = rooms.reduce((acc, cur) => acc + cur.sMain, 0);
  const sCommonSecondarySum = rooms
    .filter((i) => !i.blockNum)
    .reduce((acc, cur) => acc + cur.sSecondary, 0);
  const sCommonSummerSum = rooms
    .filter((i) => !i.blockNum)
    .reduce((acc, cur) => acc + cur.sSummer, 0);

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
      rooms: item.rooms.map((room) => ({
        ...room,
        sObsh: !!room.sMain
          ? sFormat((room.sMain / sBlockMainSum) * sBlockObsh)
          : null,
        sZhP: !!room.sMain
          ? sFormat((room.sMain / sBlockMainSum) * sBlockZhP)
          : null,
      })),
      sBlockMainSum: sFormat(sBlockMainSum),
      sBlockObsh: sFormat(sBlockObsh),
      sBlockZhP: sFormat(sBlockZhP),
    };
  }

  return blocks.map(addAreaInfo);
}

function sFormat(s) {
  return s === 0 ? null : Math.round((s * 10) * 0.1).toFixed(1);
}

export function initialSortRooms(a, b) {
  if (a.num === b.num) {
    return a.letter < b.letter ? -1 : 1;
  } else {
    return a.num < b.num ? -1 : 1;
  }
}

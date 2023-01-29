import React from "react";
import { useSelector } from "react-redux";
import { roomsToBlocks } from "../../services/roomsCalculateService";
import styles from "./AreaExlpanation.module.css";

export default function AreaExplanation() {
  const modalBlockNum = useSelector((state) => state.ui.modalBlockNum);
  const modalArea = useSelector((state) => state.ui.modalArea);
  const rooms = useSelector((state) => state.rooms.rooms);
  const block = roomsToBlocks(rooms).find(
    (bl) => bl.blockNum === modalBlockNum
  );
  //   console.log(block);
  return (
    block?.rooms?.length > 0 && (
      <>
        <div>
          {block.rooms.filter((r) => !!r.sMain).length > 1 ? (
            <h3 className={styles.header}>{`${
              modalArea === "obsh"
                ? "Общая площадь"
                : "Площадь жилого помещения"
            } блока из комнат №№ ${block.rooms
              .filter((r) => !!r.sMain)
              .map((r) => r.label)
              .join(", ")}`}</h3>
          ) : (
            <h3 className={styles.header}>{`${
              modalArea === "obsh"
                ? "Общая площадь"
                : "Площадь жилого помещения"
            } комнаты № ${block.rooms.find((r) => !!r.sMain).label}`}</h3>
          )}
        </div>
        <div>
          <div>
            <span className={styles.area_number}>
              {modalArea === "obsh" ? block.sBlockObsh : block.sBlockZhP}
            </span>
            <span> кв.м = </span>
          </div>
          <div>
            <span className={styles.area_number}>{block.sBlockMainSum}</span>
            <span> кв.м (сумма S жилых комнат) + </span>
          </div>
          <div>
            <span className={styles.area_number}>
              {roundNumber(
                block.rooms.reduce(
                  (acc, cur) => acc + Number(cur.sSecondary),
                  0
                )
              )}
            </span>
            <span> кв.м (сумма S вспомогательных комнат внутри блока) + </span>
          </div>
          {modalArea === "obsh" ? (
            <></>
          ) : (
            <div>
              <span className={styles.area_number}>
                {roundNumber(
                  block.rooms.reduce((acc, cur) => acc + Number(cur.sSummer), 0)
                )}
              </span>
              <span> кв.м (сумма S летних помещений внутри блока) + </span>
            </div>
          )}

          {modalArea === "obsh" ? (
            <div>
              <span className={styles.area_number}>
                {roundNumber(
                  block.sBlockZhP -
                    block.sBlockMainSum -
                    block.rooms.reduce(
                      (acc, cur) => acc + Number(cur.sSecondary),
                      0
                    )
                )}
              </span>
              <span>
                {" "}
                кв.м (доля от помещений общего использования без летних){" "}
              </span>
            </div>
          ) : (
            <>
              <span className={styles.area_number}>
                {roundNumber(
                  block.sBlockZhP -
                    block.sBlockMainSum -
                    block.rooms.reduce(
                      (acc, cur) => acc + Number(cur.sSecondary),
                      0
                    ) -
                    block.rooms.reduce(
                      (acc, cur) => acc + Number(cur.sSummer),
                      0
                    )
                )}
              </span>
              <span>
                {" "}
                кв.м (доля от помещений общего использования включая летние){" "}
              </span>
            </>
          )}
        </div>
      </>
    )
  );
}

function roundNumber(num) {
  return (Math.round(num * 10) * 0.1).toFixed(1);
}

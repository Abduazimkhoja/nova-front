import { FC, MouseEvent, useEffect, useRef, useState } from "react";
import styles from "./tabs.module.scss";
import cn from "classnames";

interface IActionsList {
  key: number;
  name: string;
}

const MORE_BTN_RESERVED_WIDTH = 90;

const ACTIONS_LIST: IActionsList[] = [
  {
    key: 1,
    name: "Технические ХАРАКТЕРИСТИКИ",
  },
  {
    key: 2,
    name: "ПРИМЕНЕНИЕ",
  },
  {
    key: 3,
    name: "ФУНКЦИИ",
  },
  {
    key: 4,
    name: "ЛОГИСТИЧЕСКАЯ ИНФОРМАЦИЯ",
  },
  {
    key: 5,
    name: "ОБЪЕМ ПОСТАВКИ",
  },
  {
    key: 6,
    name: "Six",
  },
  {
    key: 7,
    name: "Seven",
  },
  {
    key: 8,
    name: "Eight",
  },
  {
    key: 9,
    name: "Nine",
  },
  {
    key: 10,
    name: "Ten",
  },
];

export const Tabs: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const containerVisibleWidth = useRef<number>(0); //достаточно ли свободного места для видимых вкладок
  const actionElementsWidth = useRef<number[]>([]);
  const moreBtnLeftPosition = useRef<number>(0); //помогут нам постоянно обновлять положение кнопки

  const [toggle, setToggle] = useState(ACTIONS_LIST[0].name);
  const [actionsMoreList, setActionsMoreList] = useState<IActionsList[]>([]);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const calculateVisibility = (actionElements: HTMLDivElement[]) => {
    let visibleElementsWidth = 0;

    const actionsMoreData: IActionsList[] = [];

    let isVisible = true;

    [...actionElements].forEach((actionEl, i) => {
      visibleElementsWidth += actionElementsWidth.current[i];

      const visibleSpaceWidth =
        i !== actionElements.length - 1 ? visibleElementsWidth + MORE_BTN_RESERVED_WIDTH : visibleElementsWidth;

      if (visibleSpaceWidth <= containerVisibleWidth.current && isVisible) {
        actionEl.style.display = "flex";
      } else {
        if (isVisible) {
          moreBtnLeftPosition.current = actionElementsWidth.current.slice(0, i).reduce((acc, item) => item + acc, 0);

          isVisible = false;
        }

        actionEl.style.display = "none";

        actionsMoreData.push(ACTIONS_LIST[i]);
      }
    });

    setActionsMoreList([...actionsMoreData]);
  };

  useEffect(() => {
    if (actionElementsWidth?.current && containerRef?.current) {
      const actionElements: HTMLDivElement[] | [] =
        (Array.from(containerRef.current.children) as HTMLDivElement[]) || [];
      actionElements.splice(-1, 1);
      const actionsListWidth: number[] = [];
      [...actionElements].forEach((actionEl) => {
        actionsListWidth.push(actionEl.offsetWidth);
      });
      actionElementsWidth.current = [...actionsListWidth];

      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (entry.contentBoxSize) {
            const contentBoxSize = entry.contentBoxSize[0];
            containerVisibleWidth.current = Math.ceil(contentBoxSize.inlineSize);

            calculateVisibility(actionElements);
          }
        }
      });

      resizeObserver.observe(containerRef.current);
    }
  }, []);

  const getActive = (name: string) => {
    return toggle === name ? styles.active : "";
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles["actions-wrapper"]}>
        <div className={styles["main-actions"]} ref={containerRef}>
          {ACTIONS_LIST.map(({ key, name }) => (
            <div
              key={key}
              onClick={() => {
                setToggle(name);
                setIsMoreOpen(false);
              }}
              className={cn(styles.action, getActive(name))}
            >
              {name}
            </div>
          ))}
          <div
            className={cn(styles["more-btn"], actionsMoreList.length ? styles.visible : styles.hidden)}
            style={{ left: moreBtnLeftPosition.current }}
            onClick={() => setIsMoreOpen(!isMoreOpen)}
          >
            More...
          </div>
        </div>
      </div>

      <div className={cn(styles["more-options"], isMoreOpen ? "" : styles.hidden)}>
        {actionsMoreList.map(({ key, name }) => (
          <div
            key={key}
            onClick={() => {
              setToggle(name);
              setIsMoreOpen(false);
            }}
            className={cn(styles.action, getActive(name))}
          >
            {name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;

import { useState, useEffect } from "react";
import { API_KEY, API_URL } from "./config";
import { Preloader } from "./Preloader";
import { GoodsList } from "./GoodsList";
import { BasketList } from "./BasketList";
import { Tooltip } from "./Tooltip";
import { Cart } from "./Cart";

export function Shop() {
  const [goods, setGoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState([]);
  const [isBasketShow, setIsBasketShow] = useState(false);
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(API_URL, {
        headers: { Authorization: API_KEY },
      });
      const data = await response.json();
      setGoods(data.shop);
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (isTooltipVisible) {
      const timer = setTimeout(() => {
        setTooltipVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isTooltipVisible]);

  const addToBasket = (item) => {
    setOrder((prevOrder) => {
      const itemIndex = prevOrder.findIndex(
        (orderItem) => orderItem.mainId === item.mainId
      );

      if (itemIndex < 0) {
        return [...prevOrder, { ...item, quantity: 1 }];
      }

      return prevOrder.map((orderItem, index) =>
        index === itemIndex
          ? { ...orderItem, quantity: orderItem.quantity + 1 }
          : orderItem
      );
    });
    setTooltipVisible(true);
  };

  const removeFromBasket = (mainId) => {
    setOrder((prevOrder) => prevOrder.filter((item) => item.mainId !== mainId));
  };

  const incrementQuantity = (mainId) => {
    setOrder((prevOrder) =>
      prevOrder.map((item) =>
        item.mainId === mainId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (mainId) => {
    setOrder((prevOrder) =>
      prevOrder
        .map((item) => {
          if (item.mainId === mainId) {
            return item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const handleBasketShow = () => {
    setIsBasketShow(prev => !prev);
  };
  

  const closeModal = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      setIsBasketShow(false);
    }
  };

  return (
    <main className="container content">
      <div className="cart-container">
        <Cart quantity={order.length} handleBasketShow={handleBasketShow} />
      </div>

      {isBasketShow && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content">
            <button
              className="modal-close"
              onClick={() => setIsBasketShow(false)}
            >
              &times;
            </button>
            <BasketList
              order={order}
              removeFromBasket={removeFromBasket}
              incrementQuantity={incrementQuantity}
              decrementQuantity={decrementQuantity}
            />
          </div>
        </div>
      )}


      {loading ? (
        <Preloader />
      ) : (
        <GoodsList goods={goods} addToBasket={addToBasket} />
      )}
      <Tooltip isVisible={isTooltipVisible} message="Товар в корзине!" />
    </main>
  );
}
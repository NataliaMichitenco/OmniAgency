document.addEventListener("DOMContentLoaded", () => {
    const toggleCallBtn = document.getElementById("orderCall"); // Кнопка
    let orderCallContent = null; // Содержимое блока
    let isLoaded = false; // Флаг, чтобы загрузить HTML только один раз

    // Обработчик кнопки
    toggleCallBtn.addEventListener("click", async () => {
        if (!isLoaded) {
            try {
                // Загружаем HTML-файл с содержимым
                const response = await fetch("/modal/orderСall.html");
                const html = await response.text();

                // Создаем DOM-элемент для вставки содержимого
                orderCallContent = document.createElement("div");
                orderCallContent.classList.add("order"); // Добавляем класс
                orderCallContent.style.display = "none"; // Изначально скрыт
                orderCallContent.innerHTML = html;

                // Добавляем в документ (например, в конец body)
                document.body.appendChild(orderCallContent);

                // Находим кнопку закрытия и добавляем обработчик события
                const closeButton = orderCallContent.querySelector(".order__call_close");
                if (closeButton) {
                    closeButton.addEventListener("click", () => {
                        orderCallContent.style.display = "none"; // Скрываем модальное окно
                    });
                }

                isLoaded = true; // Флаг, чтобы не загружать снова
            } catch (error) {
                console.error("Ошибка загрузки HTML:", error);
                alert("Не удалось загрузить содержимое");
            }
        }

        if (orderCallContent) {
            // Переключаем видимость блока
            const isHidden = orderCallContent.style.display === "none";

            orderCallContent.style.display = isHidden ? "flex" : "none";
        }
    });
});
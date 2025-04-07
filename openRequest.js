document.addEventListener("DOMContentLoaded", () => {
    const toggleRequestBtn = document.getElementById("openRequest"); // Кнопка
    let leaveRequestContent = null; // Содержимое блока
    let isLoaded = false; // Флаг, чтобы загрузить HTML только один раз

    // Обработчик кнопки
    toggleRequestBtn.addEventListener("click", async () => {
        if (!isLoaded) {
            try {
                // Загружаем HTML-файл с содержимым
                const response = await fetch("/modal/leaveRequest.html");
                const html = await response.text();

                // Создаем DOM-элемент для вставки содержимого
                leaveRequestContent = document.createElement("div");
                leaveRequestContent.classList.add("request"); // Добавляем класс
                leaveRequestContent.style.display = "none"; // Изначально скрыт
                leaveRequestContent.innerHTML = html;

                // Добавляем в документ (например, в конец body)
                document.body.appendChild(leaveRequestContent);

                // Находим кнопку закрытия и добавляем обработчик события
                const closeButton = leaveRequestContent.querySelector(".request__box_close");
                if (closeButton) {
                    closeButton.addEventListener("click", () => {
                        leaveRequestContent.style.display = "none"; // Скрываем модальное окно
                    });
                }

                isLoaded = true; // Флаг, чтобы не загружать снова
            } catch (error) {
                console.error("Ошибка загрузки HTML:", error);
                alert("Не удалось загрузить содержимое");
            }
        }

        if (leaveRequestContent) {
            // Переключаем видимость блока
            const isHidden = leaveRequestContent.style.display === "none";

            leaveRequestContent.style.display = isHidden ? "flex" : "none";
        }
    });
});
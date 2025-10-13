Тестирование dev
1. Открыла страницу `/shipments`, вижу список из 3 поставок, у таблицы атрибут data-testid="shipments-table"
2. Кликаю по ссылке Открыть в строке поставки с id=1 и статусом new, у строки tr атрибут data-testid="shipments-row-1", у кнопки атрибут data-testid="open-shipment-1"
3. Открылась страница `/shipments/1`, на странице заголовок - добавила data-testid="shipment-header", таблица товаров с атрибутом data-testid="shipment-items-table", кнопка назад и кнопка "отправить на пересчет" - data-testid="start-recount-btn"
4. Кликаю по кнопке "отправить на пересчет"
5. Открылась страница `/recount/1` с заглушкой data-testid="recount-screen-placeholder"

Тестирование prod-сборки

1. Открыла страницу `/shipments`, вижу список из 3 поставок, у таблицы атрибут data-testid="shipments-table"
2. Кликаю по ссылке Открыть в строке поставки с id=1 и статусом new, у строки tr атрибут data-testid="shipments-row-1", у кнопки атрибут data-testid="open-shipment-1"
3. Открылась страница `/shipments/1`, на странице заголовок - data-testid="shipment-header", таблица товаров с атрибутом data-testid="shipment-items-table", кнопка назад и кнопка "отправить на пересчет" - data-testid="start-recount-btn"
4. Кликаю по кнопке "отправить на пересчет"
5. Открылась страница `/recount/1` с заглушкой data-testid="recount-screen-placeholder"
6. Клик по второй поставке data-testid="shipments-row-2" и кнопке Открыть data-testid="open-shipment-2"
7. Открылась страница `/shipments/2` на странице заголовок - data-testid="shipment-header", таблица товаров с атрибутом data-testid="shipment-items-table", кнопка назад, кнопки "отправить на пересчет" нет
8. Клик по третьей поставке data-testid="shipments-row-3" и кнопке Открыть data-testid="open-shipment-3"
9. Открылась страница `/shipments/3` на странице заголовок - data-testid="shipment-header", таблицы товаров нет, вместо нее текст "Нет товаров"

Сложности: было сложно изначально разобраться как что работает, т.к. vue для меня совершенно был незнаком, приходилось много и быстро читать-смотреть. Не знаю, как оценить риски и план на 2 неделю, нужны примеры)
import {EventContent, FoodEstablishmentContent, SelectionInfoResponse} from "./selection.types.ts";
import {mockHttp} from "../../shared/http.ts";
import {CostLevelEnum} from "../Establishment/components/Details/details.types.ts";
import {AgeRating} from "../Events/events.types.ts";


// Мок-объект для заведения общественного питания
const mockFoodEstablishment: FoodEstablishmentContent = {
    id: 1,
    type: 'FOOD_ESTABLISHMENT',
    mainImg: {
        id: 101,
        name: 'restaurant.jpg',
        url: 'https://img.freepik.com/free-photo/the-adorable-illustration-of-kittens-playing-in-the-forest-generative-ai_260559-483.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1723680000&semt=ais_hybrid',
    },
    title: 'Ресторан «Тестовый»',
    description: 'Отличное место для отдыха и вкусной еды.',
    categoryInfoDto: {
        id: 1,
        title: 'Ресторан',
    },
    innerCategoryInfo: {
        id: 11,
        title: 'Гастрономия',
        serialNumber: 1,
    },
    serialNumber: 1001,
    inFavorites: false,
    costLevel: CostLevelEnum.THREE,
};

// Мок-объект для мероприятия
const mockEvent: EventContent = {
    id: 2,
    type: 'EVENT',
    mainImg: {
        id: 102,
        name: 'concert.jpg',
        url: 'https://klike.net/uploads/posts/2023-02/1675234996_3-35.jpg',
    },
    title: 'Концерт «Рок-фестиваль»',
    description: 'Концерт, который нельзя пропустить!',
    categoryInfoDto: {
        id: 2,
        title: 'Мероприятие',
    },
    innerCategoryInfo: {
        id: 12,
        title: 'Концерт',
    },
    serialNumber: 2001,
    inFavorites: true,
    ageLimit: AgeRating.EIGHTEEN,
};

// Основной ответ с информацией о подборке
const mockSelectionInfo: SelectionInfoResponse = {
    mainImg: {
        id: 100,
        name: 'selection.jpg',
        url: 'https://img.freepik.com/free-photo/the-adorable-illustration-of-kittens-playing-in-the-forest-generative-ai_260559-483.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1723680000&semt=ais_hybrid',
    },
    title: 'Тестовая подборка',
    description: 'Подборка для тестирования.',
    contentObjects: [mockFoodEstablishment, mockEvent],
};

// Настройка мока для URL
mockHttp.onGet('/selection/get').reply(200, mockSelectionInfo);

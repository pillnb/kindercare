// Define types inline since they're not exported from progress page
type Statistics = { title: string; value: number | string; icon?: string };
type Materi = { title: string; description: string; progress?: number };

export const statistics: Statistics[] = [
    {
        "title": "Runtutan Hari",
        "value": 5,
        "icon": "/icon/streak.svg"
    },
    {
        "title": "Pembelajaran Hari Ini",
        "value": "46 min",
        "icon": "/icon/learning.svg"
    },
    {
        "title": "Webinar Diikuti",
        "value": 3,
        "icon": "/icon/webinar.svg"
    },
    {
        "title": "Materi Terselesaikan",
        "value": 10,
        "icon": "/icon/lesson.svg"
    }
]

export const materi: Materi[] = [
    {
        "title": "Tubuh Milik Kita",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
        "title": "Hidup Sehat",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
        "title": "Tidur Teratur",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
]
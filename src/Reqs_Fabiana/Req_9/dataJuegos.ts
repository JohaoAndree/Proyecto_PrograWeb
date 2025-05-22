export interface Juego{
    id: number
    titulo: string
    cover: string
    desc: string
    urlTrailer: string
    capturas: string[]
    estrellas: number
    resenas: string[]
}

export const listaJuegos: Juego[] = [
    {
        id: 1, 
        titulo: "Minecraft",
        cover: "https://i.pinimg.com/736x/00/a8/e4/00a8e4a3edf9937c186dbecd009fd48d.jpg",
        desc: "Juego de bloques",
        urlTrailer: "ttps://www.youtube.com/embed/MmB9b5njVbA?si=yBnre528seQFvHKY",
        capturas: [
            "https://images.surferseo.art/aad6eeed-7807-47e3-a09f-3b294fd2d3d5.png",
            "https://bigtechquestion.com/wp-content/uploads/2018/08/2017-02-08_11.03.51-990x524.png",
            "https://cdn.pixabay.com/photo/2017/05/20/23/22/minecraft-2330079_1280.jpg"
        ],
        estrellas: 4,
        resenas: [
            "Me hizo crecer pelos en el pecho!",
            "Lo compre por error y ahora estoy endeudado con el banco",
            "Bloquecito :3"
        ]
    },
    {
        id: 2,
        titulo: "Genshin Impact",
        cover: "https://i.pinimg.com/736x/00/06/fa/0006fa17af75b8e059bbee4363b3c8a1.jpg",
        desc: "Explora Teyvat!",
        urlTrailer: "https://www.youtube.com/embed/TAlKhARUcoY?si=CH6YO2VLY3QME-86",
        capturas: [
            "https://www.rpgfan.com/wp-content/uploads/2020/10/Genshin-Impact-Screenshot-074.jpg",
            "https://www.dsogaming.com/wp-content/uploads/2019/06/Genshin-Impact-12.jpg",
            "https://pm1.aminoapps.com/7817/e59750ca0596fa23631d97d5b464ddfd8c6110a5r1-1920-1080v2_hq.jpg"
        ],
        estrellas: 3,
        resenas: [
            "Mucho anime",
            "Mi flaca me dejo al ver que lo jugaba",
            "Me gusta la musica"
        ]
    },
    {
        id: 3,
        titulo: "FIFA 13",
        cover: "https://upload.wikimedia.org/wikipedia/en/5/51/FIFA_13_Global_Cover.jpeg",
        desc: "Juego de futbol",
        urlTrailer: "https://www.youtube.com/embed/cNnmAlEnUt0?si=Bj4S9M-NYLUvBV5s",
        capturas: [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS05tu6KtpyEEDuakddWJsuO9NS21rJmYANGw&s",
            "https://cdn.mos.cms.futurecdn.net/ac169ef8a052efe6b29edfa8ae19d394.jpg",
            "https://i.nextmedia.com.au/Galleries/20120516043146_fifa13_attackingintelligence_telecam_arsenalvschelsea_wm.jpg"
        ],
        estrellas: 4,
        resenas: [
            "Es el mismo del año pasado!",
            "El mejor de la franquicia",
            "Yo queria PES :("
        ]
    }
]
import { createServer, Model } from "miragejs";

let server = createServer({
    models: {
        question: Model,
    },

    routes() {
        this.namespace = "api";
        this.get("/questions", (schema, request) => {
            return schema.questions.all()
        });
        this.get("/other", () => {
            alert("!")
        })
        this.get("/branch/:branch", (schema, request) => {
            let branch = request.params.branch;
            return (schema.questions.where({ branch: branch }).models.map(el => el.attrs))
        })
        this.get("/branches", () => {
            return {
                themes: ["Aviation", "Medicine", "Architecture", "Programming", "Engineering", "Psychology"]
            }
        })
    },

    seeds(server) {
        server.create("question", { id: 1, q: "Thrust", v: ["Сила тяги", "Порох", 'Сила натяжения'], c: "Сила тяги", branch: "aviation" })
        server.create("question", { id: 2, q: "Runway", v: ["Беги путь", "Взлетная полоса", "Задняя часть крыла"], c: "Взлетная полоса", branch: "aviation" })
        server.create("question", { id: 3, q: "Rotor mast", v: ["Вал несущего винта", "Мотор вертолета", "Моторный двигатель"], c: "Вал несущего винта", branch: "aviation" })
        server.create("question", { id: 4, q: "Belly-flopped", v: ["Перевернуть самолет вверх пузом", "Посадить самолет аккуратно", "Посадить самолет на фюзляж"], c: "Посадить самолет на фюзляж", branch: "aviation" })
        server.create("question", { q: "Syringe", v: ["Серьга", "Шприц", 'Укол'], c: "Шприц", branch: "medicine" })
        server.create("question", { q: "X-ray", v: ["Лучевой поток","Просмотр сквозь стены","Рентген"], c: "Рентген", branch: "medicine" })
        server.create("question", { q: "Ointment", v: ["Мазь","Зубная паста","Масло"], c: "Мазь", branch: "medicine" })
        server.create("question", { q: "Side-effect", v: ["Побочные эффекты","Неоднозначный диагноз","Эффект сторон"], c: "Побочные эффекты", branch: "medicine" })
        server.create("question", { q: "kidney", v: ["Легкое","Почка","Печень"], c: "Почка", branch: "medicine" })
        server.create("question", { q: "adobe", v: ["самана","стена","фотошоп"], c: "самана",branch: "architecture"})
        server.create("question", { q: "embellishment", v: ["воплощение","стелла","украшение"], c: "украшение",branch: "architecture"})
    },
})

export default server
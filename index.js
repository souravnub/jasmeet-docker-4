const { PrismaClient } = require("@prisma/client");
const express = require("express");
const app = express();
const client = new PrismaClient();

app.use(express.json());

app.get("/students", async (req, res) => {
    const students = await client.student.findMany();
    res.json({
        students,
    });
});
app.post("/students", async (req, res) => {
    if (!req.body.name) {
        return res.status(400).json({
            error: "Student name is missing",
        });
    }
    if (!req.body.course) {
        return res.status(400).json({
            error: "Student course is missing",
        });
    }
    const allStudents = await client.student.findMany();
    if (
        allStudents.find(
            (student) => student.name.trim() === req.body.name.trim()
        )
    ) {
        return res.status(409).json({
            error: "Student already exsits",
        });
    }
    await client.student.create({
        data: {
            name: req.body.name,
            courses: req.body.course,
        },
    });
    res.status(201).json({
        message: "student created",
    });
});

app.delete("/students/:id", async (req, res) => {
    const id = Number(req.params.id);

    const student = await client.student.findFirst({
        where: { id },
    });
    if (!student) {
        return res.status(404).json({
            message: "Studnet not exists",
        });
    }

    await client.student.delete({
        where: {
            id,
        },
    });
    res.status(200).json({
        message: "student deleted successfully",
    });
});

app.listen(8080, () => {
    console.log("App running on port 8080");
});

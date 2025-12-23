import AddIcon from "./icons/add";
import CloseIcon from "./icons/close";
import { useEffect, useState } from "react";
import TextareaAutosize from 'react-textarea-autosize';
import type { CategoryInfo, TaskInfo } from "../libs/types"


export default function Tasks() {
    const [tasksInfo, setTasksInfo] = useState<TaskInfo[]>([]);
    const [categoriesInfo, setcategoriesInfo] = useState<CategoryInfo[]>([]);

    useEffect(() => {
        const savedTasks = localStorage.getItem("tasks");
        const savedCategories = localStorage.getItem("categories");
        const firstTimeVisiting = !localStorage.getItem("Visited");

        if (savedTasks) {
            const parsedTasksInfo = JSON.parse(savedTasks).map((task: TaskInfo) => ({
                ...task,
                timeMade: new Date(task.timeMade)
            }));
            setTasksInfo(parsedTasksInfo);
        }

        if (savedCategories) {
            const parsedCategoriesInfo = JSON.parse(savedCategories);
            setcategoriesInfo(parsedCategoriesInfo);
        }

        if (firstTimeVisiting) {
            const predefinedCategories: CategoryInfo[] = [
                { id: 1, name: "Werk", sortingOrder: "earliest_to_latest" },
                { id: 2, name: "Persoonlijk", sortingOrder: "earliest_to_latest" },
                { id: 3, name: "Vrije tijd", sortingOrder: "earliest_to_latest" },
            ];
            setcategoriesInfo(predefinedCategories);

            const predefinedTasks: TaskInfo[] = [
                { id: 1, category_id: 1, task: "Finish project report", completed: false, timeMade: new Date() },
                { id: 2, category_id: 2, task: "Call family", completed: false, timeMade: new Date() },
                { id: 3, category_id: 3, task: "Go for a walk", completed: false, timeMade: new Date() },
            ];
            setTasksInfo(predefinedTasks);

            localStorage.setItem("Visited", "they have visisted before");
        }

    }, []);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasksInfo));
    }, [tasksInfo]);

    useEffect(() => {
        localStorage.setItem("categories", JSON.stringify(categoriesInfo));
    }, [categoriesInfo]);

    const addEmptyTask = (category_id: CategoryInfo['id']) => {
        const listOfIds = tasksInfo.length > 0 ? tasksInfo.map(taskInfo => taskInfo.id) : [-1];
        const highestId = Math.max(...listOfIds);
        const CurrentTime = new Date();

        const newTask: TaskInfo = {
            id: highestId + 1,
            category_id,
            task: "",
            completed: false,
            timeMade: CurrentTime,
        };

        setTasksInfo([...tasksInfo, newTask]);
    };

    const addCategory = (name: CategoryInfo['name']) => {
        const listOfIds = categoriesInfo.length > 0 ? categoriesInfo.map(categoryInfo => categoryInfo.id) : [-1];
        const highestId = Math.max(...listOfIds);

        const newCategoryInfo: CategoryInfo = {
            id: highestId + 1,
            name,
            sortingOrder: "earliest_to_latest"
        };
        setcategoriesInfo([...categoriesInfo, newCategoryInfo])
    }

    const saveAndUpdateTaskText = (id: TaskInfo['id'], task: TaskInfo['task']) => {
        const updatedTasksInfo = tasksInfo.map((taskInfo) =>
            taskInfo.id === id ? { ...taskInfo, task: task } : taskInfo
        );
        setTasksInfo(updatedTasksInfo);
    };

    const removeTask = (id: TaskInfo['id']) => {
        const newTasks = tasksInfo.filter((task) => task.id !== id);
        setTasksInfo(newTasks);
    };

    const removeCategory = (id: CategoryInfo['id']) => {
        setcategoriesInfo(
            categoriesInfo.filter(category => category.id !== id)
        );

        setTasksInfo(
            tasksInfo.filter(task => task.category_id !== id)
        );
    };

    const saveAndUpdateCategoryText = (id: TaskInfo['id'], name: CategoryInfo['name']) => {
        const updatedCategoriesInfo = categoriesInfo.map((categoryInfo) =>
            categoryInfo.id === id ? { ...categoryInfo, name } : categoryInfo
        )
        setcategoriesInfo(updatedCategoriesInfo);
    };

    const toggleCompletedTask = (id: TaskInfo['id']) => {
        const updatedCompletedTasksInfo = tasksInfo.map(taskInfo => (
            taskInfo.id === id ? { ...taskInfo, completed: !taskInfo.completed } : taskInfo
        ))
        setTasksInfo(updatedCompletedTasksInfo)
    }

    const calculateCategoryProgression = (id: CategoryInfo['id']) => {
        const tasksFromCategory = tasksInfo.filter(task => task.category_id === id);
        if (tasksFromCategory.length === 0) return 0;

        const completedTasks = tasksFromCategory.filter(task => task.completed).length;
        const progression = (completedTasks / tasksFromCategory.length) * 100;

        return progression;
    }

    const saveAndUpdateSortingOrder = (categoryId: number, sortingOrder: CategoryInfo['sortingOrder']) => {
        const updatedCategories = categoriesInfo.map(category =>
            category.id === categoryId ? { ...category, sortingOrder } : category
        );
        setcategoriesInfo(updatedCategories);
    };

    const sortTasks = (tasks: TaskInfo[], sortingOrder: CategoryInfo['sortingOrder']) => {
        if (sortingOrder === "earliest_to_latest") {
            return tasks.slice().sort((a, b) => new Date(a.timeMade).getTime() - new Date(b.timeMade).getTime());
        } else {
            return tasks.slice().sort((a, b) => new Date(b.timeMade).getTime() - new Date(a.timeMade).getTime());
        }
    };

    return (
        <main className="bg-[#9400FF] h-full min-h-200 pt-40 pb-10 px-15">

            <section className="flex flex-col gap-8 ">
                <div className="flex items-center">
                    <h1 className="ml-10 text-4xl text-white font-bold">To Do App</h1>
                    <button aria-label="Add category" className=" ml-auto mr-10" onClick={() => { addCategory("Untitled category") }}>
                        <AddIcon className="w-20 fill-current rounded-full bg-gray-100" />
                    </button>
                </div>

                <ul className="flex gap-4 flex-wrap justify-center items-start">

                    {categoriesInfo.map((categoryInfo) => (
                        <li key={categoryInfo.id}>
                            <article className="p-5 rounded-2xl bg-gray-700 text-white">
                                <header className="flex mb-2 gap-1 items-start">
                                    <h2 className="font-bold text-lg">
                                        <TextareaAutosize
                                            value={categoryInfo.name}
                                            onChange={(e) => saveAndUpdateCategoryText(categoryInfo.id, e.target.value)}
                                            className="p-1 w-full resize-none overflow-hidden rounded-lg max-w-40"
                                        />
                                    </h2>

                                    <button aria-label="close category" className="ml-auto text-3xl" onClick={() => { removeCategory(categoryInfo.id) }}>
                                        <CloseIcon className="w-10 aspect-square fill-current" />
                                    </button>
                                </header>

                                <div>
                                    <progress
                                        className="w-full rounded-2xl mt-4"
                                        value={calculateCategoryProgression(categoryInfo.id)}
                                        max={100}
                                    />
                                    <div className="flex justify-between text-[0.9rem]">

                                        <select
                                            value={categoryInfo.sortingOrder}
                                            onChange={(event) => {
                                                saveAndUpdateSortingOrder(categoryInfo.id, event.target.value as CategoryInfo['sortingOrder'])
                                            }}
                                        >
                                            <option value="earliest_to_latest">oud naar nieuw</option>
                                            <option value="latest_to_earliest">nieuw naar oud</option>
                                        </select>

                                        <button aria-label="Add task" onClick={() => { addEmptyTask(categoryInfo.id) }}>
                                            <AddIcon className="w-9 h-full fill-current" />
                                        </button>
                                    </div>


                                    <ol className="space-y-4 mt-8">
                                        {sortTasks(
                                            tasksInfo.filter(task => task.category_id === categoryInfo.id),
                                            categoryInfo.sortingOrder
                                        ).map(taskInfo => (
                                            <li key={taskInfo.id} className="flex mt-4 justify-between items-center bg-gray-600 rounded-lg px-2">
                                                <TextareaAutosize
                                                    value={taskInfo.task}
                                                    onChange={(e) => saveAndUpdateTaskText(taskInfo.id, e.target.value)}
                                                    className="flex-1 p-1 rounded resize-none overflow-hidden text-[0.8rem] max-w-40 py-3"
                                                    placeholder="text"
                                                />

                                                <div className="flex items-start ml-2 gap-1">
                                                    <input
                                                        checked={taskInfo.completed}
                                                        type="checkbox"
                                                        className="top-0 right-0 h-9 aspect-square "
                                                        onChange={() => toggleCompletedTask(taskInfo.id)}
                                                    />

                                                    <button
                                                        onClick={() => removeTask(taskInfo.id)}
                                                        className="text-red-500 font-bold text-4xl"
                                                        aria-label="remove task"
                                                    >
                                                        <CloseIcon className="w-9 aspect-square fill-current" />

                                                    </button>

                                                </div>

                                            </li>
                                        ))}

                                    </ol>
                                </div>

                            </article>

                        </li>
                    ))}
                </ul>
            </section>
        </main>

    );
}



import Column from "../Column/Column";
import Loader from "../Loader";
import { SMain, SMainBlock, SMainContent } from "./Main.styled";

export default function Main({ columns, loading, onCardClick }) {
    if (loading) {
        return (
            <SMain>
                <div className="container">
                    <Loader />
                </div>
            </SMain>
        );
    }

    return (
        <SMain>
            <div className="container">
                <SMainBlock>
                    <SMainContent>
                        {columns.map((col) => (
                            <Column
                                key={col.id}
                                title={col.title}
                                tasks={col.tasks}
                                onCardClick={onCardClick}
                            />
                        ))}
                    </SMainContent>
                </SMainBlock>
            </div>
        </SMain>
    );
}

import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useCRM } from "@/lib/store";
import { motion } from "framer-motion";

export default function Pipeline() {
  const leads = useCRM((s) => s.leads);
  const updateLead = useCRM((s) => s.updateLead);

  const columns = {
    novo: leads.filter((l) => l.status === "novo"),
    contato: leads.filter((l) => l.status === "contato"),
    qualificado: leads.filter((l) => l.status === "qualificado"),
  };

  function handleDragEnd(result: any) {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId !== source.droppableId) {
      updateLead(draggableId, { status: destination.droppableId });
    }
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(columns).map(([colId, items]) => (
          <Droppable key={colId} droppableId={colId}>
            {(provided: any) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="card-glass min-h-[300px] p-4 flex flex-col"
              >
                <h3 className="text-neon-cyan mb-4 font-semibold capitalize text-lg">
                  {colId}
                </h3>
                <div className="flex-1 flex flex-col gap-3">
                  {items.map((item: any, index: number) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided: any, snapshot: any) => (
                        <motion.div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          initial={{ scale: 1 }}
                          whileHover={{ scale: 1.03, boxShadow: "0 0 15px #00ffff" }}
                          whileTap={{ scale: 0.97 }}
                          transition={{ duration: 0.2 }}
                          className="bg-gray-700/30 p-3 rounded-lg cursor-pointer flex justify-between items-center"
                        >
                          <span className="text-white">{item.nome}</span>
                        </motion.div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}

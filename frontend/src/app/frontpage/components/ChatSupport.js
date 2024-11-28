import React, { useState } from "react";
import styles from "./ChatSupport.module.css";
// import { v4 as uuidv4 } from "uuid"; // Importar UUID
import { FaCommentAlt, FaChevronLeft } from "react-icons/fa";

const ChatSupport = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    // const [chatId, setChatId] = useState(null); // Inicia con null
    const [step, setStep] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedSubOption, setSelectedSubOption] = useState(null);
    const [isChatEnabled, setIsChatEnabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Estado de carga mientras espera respuesta del asesor
    // const [eventSource, setEventSource] = useState(null); // Estado para la conexión SSE

    const [chatMessages, setChatMessages] = useState([]); // Lista de mensajes del chat
    const [inputMessage, setInputMessage] = useState(""); // Mensaje del input

    const options = [
        { id: 1, label: "📦 Tengo problemas con un producto" },
        { id: 2, label: "ℹ️ Quiero más información" },
        { id: 3, label: "🛒 Necesito ayuda con un pedido" },
        { id: 4, label: "❓ Tengo otra consulta" },
    ];

    const subOptions = {
        1: ["🚚 Producto no llegó", "📉 Producto llegó dañado", "🛠️ Garantía del producto", "❓ Otro problema con el producto"],
        2: ["💰 Información sobre precios", "📝 Detalles técnicos", "📦 Disponibilidad", "🔍 Otro tipo de información"],
        3: ["📦 Estado de mi pedido", "❌ Cancelar pedido", "✏️ Modificar pedido", "❓ Otro tipo de ayuda con el pedido"],
        4: ["💡 Consulta general 1", "💡 Consulta general 2", "💡 Consulta general 3", "🔍 Otro"],
    };

    const predefinedResponses = {
        "🚚 Producto no llegó": "📩 Te recomendamos revisar tu correo para el estado del envío.",
        "📉 Producto llegó dañado": "📸 Por favor, toma fotos del producto y contáctanos.",
        "🛠️ Garantía del producto": "📜 Puedes consultar nuestra política de garantía aquí.",
        "❓ Otro problema con el producto": "✍️ Cuéntanos más sobre tu problema.",
        "💰 Información sobre precios": "🛒 Puedes encontrar los precios en nuestra página web.",
        "📝 Detalles técnicos": "📑 Consulta las especificaciones técnicas en la ficha del producto.",
        "📦 Disponibilidad": "📦 Estamos trabajando para reabastecer nuestros productos.",
        "🔍 Otro tipo de información": "📬 Cuéntanos qué información necesitas.",
        "📦 Estado de mi pedido": "🔍 Revisa el estado de tu pedido en tu cuenta.",
        "❌ Cancelar pedido": "📞 Contacta a nuestro equipo de soporte para cancelaciones.",
        "✏️ Modificar pedido": "📤 Modificaciones solo son posibles antes del envío.",
        "❓ Otro tipo de ayuda con el pedido": "✍️ Cuéntanos más sobre tu problema.",
        "💡 Consulta general 1": "✅ Esto es un ejemplo de consulta general 1.",
        "💡 Consulta general 2": "✅ Esto es un ejemplo de consulta general 2.",
        "💡 Consulta general 3": "✅ Esto es un ejemplo de consulta general 3.",
        "🔍 Otro": "📋 Por favor, detalla tu consulta para ayudarte mejor.",
    };

    const toggleChat = () => {
        if (isChatOpen && isChatEnabled) {
            const confirmClose = window.confirm(
                "El chat está activo. Si cierras, se perderá todo el historial. ¿Deseas continuar?"
            );
            if (!confirmClose) return;
        }

        setIsChatOpen(!isChatOpen);

        if (!isChatOpen) {
            // Reinicia todos los estados relevantes
            setChatMessages([]);
            setStep(0);
            setSelectedOption(null);
            setSelectedSubOption(null);
            setIsChatEnabled(false);
            setIsLoading(false); // Asegúrate de ocultar "esperando"
            // setChatId(null); // Borra el chatId para asegurarte de que se genera uno nuevo
        }
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setStep(1);
    };

    const handleSubOptionClick = (subOption) => {
        setSelectedSubOption(subOption);
        setStep(2);
    };

    const enableChat = () => {
        // if (!chatId) {
        //     const newChatId = uuidv4(); // Genera un nuevo `chatId` si no existe
        //     setChatId(newChatId);
        // }
        setIsChatEnabled(true);
        setStep(3);

        const initialMessage = {
            // chatId: chatId || uuidv4(), // Asegura que se usa el `chatId` correcto
            sender: "user",
            text: "Hola! Necesito ayuda con esto",
        };

        setChatMessages((prev) => [...prev, initialMessage]);
        // sendMessageToBackend(initialMessage);

        setIsLoading(true); // Activa el estado de "esperando"
    };

    // const sendMessageToBackend = async (message) => {
    //     if (!chatId) {
    //         console.error("No se puede enviar un mensaje sin un chatId");
    //         return;
    //     }

    //     try {
    //         await fetch("http://localhost:3001/send-message", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify(message),
    //         });
    //         console.log("Mensaje enviado al backend:", message);
    //     } catch (error) {
    //         console.error("Error enviando el mensaje al backend:", error);
    //     }
    // };

    const handleSendMessage = () => {
        if (inputMessage.trim() && !isLoading) {
            const newMessage = {
                // chatId,
                sender: "user",
                text: inputMessage.trim(),
            };
            setChatMessages((prev) => [...prev, newMessage]);
            // sendMessageToBackend(newMessage);
            setInputMessage("");
        }
    };

    // useEffect(() => {
    //     if (!chatId) return; // No conectar si no hay un `chatId`

    //     console.log(`Conectando a SSE para chatId: ${chatId}`);
    //     const newEventSource = new EventSource(`http://localhost:3001/events/${chatId}`);
    //     setEventSource(newEventSource); // Guarda la referencia al nuevo `EventSource`

    //     newEventSource.onmessage = (event) => {
    //         const receivedMessage = JSON.parse(event.data);
    //         console.log("Mensaje recibido vía SSE:", receivedMessage);

    //         if (receivedMessage.chatId !== chatId) {
    //             console.warn(`Mensaje recibido para un chatId diferente: ${receivedMessage.chatId}`);
    //             return;
    //         }

    //         setChatMessages((prevMessages) => {
    //             const isDuplicate = prevMessages.some(
    //                 (msg) =>
    //                     msg.chatId === receivedMessage.chatId &&
    //                     msg.sender === receivedMessage.sender &&
    //                     msg.text === receivedMessage.text
    //             );
    //             if (!isDuplicate) {
    //                 return [...prevMessages, receivedMessage];
    //             }
    //             return prevMessages;
    //         });

    //         if (receivedMessage.sender === "advisor") {
    //             setIsLoading(false); // Desbloquear el chat
    //         }
    //     };

    //     newEventSource.onerror = (error) => {
    //         console.error("Error en la conexión SSE:", error);
    //     };

    //     return () => {
    //         console.log(`Cerrando conexión SSE para chatId: ${chatId}`);
    //         newEventSource.close();
    //     };
    // }, [chatId]);

    return (
        <>
            <div className={styles.chatContainer}>
                <button className={styles.chatButton} onClick={toggleChat}>
                    <FaCommentAlt />
                </button>
            </div>

            {isChatOpen && (
                <div className={styles.chatBox}>
                    <div className={styles.chatHeader}>
                        {step > 0 && (
                            <FaChevronLeft
                                className={styles.backIcon}
                                onClick={() => setStep(step - 1)}
                            />
                        )}
                        <h3>Soporte</h3>
                        <button className={styles.closeButton} onClick={toggleChat}>
                            ×
                        </button>
                    </div>
                    <div className={styles.chatBody}>
                        {chatMessages.map((msg, index) => (
                            <div
                                key={index}
                                className={
                                    msg.sender === "user"
                                        ? styles.userMessage
                                        : styles.botMessage
                                }
                            >
                                {msg.text}
                            </div>
                        ))}
                        {step === 0 && (
                            <div>
                                <p>¡Hola! ¿En qué podemos ayudarte?</p>
                                <ul className={styles.optionsList}>
                                    {options.map((option) => (
                                        <li
                                            key={option.id}
                                            className={styles.option}
                                            onClick={() => handleOptionClick(option.id)}
                                        >
                                            {option.label}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {step === 1 && selectedOption && (
                            <div>
                                <p>Por favor selecciona una opción relacionada:</p>
                                <ul className={styles.optionsList}>
                                    {subOptions[selectedOption].map((subOption, index) => (
                                        <li
                                            key={index}
                                            className={styles.option}
                                            onClick={() => handleSubOptionClick(subOption)}
                                        >
                                            {subOption}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {step === 2 && selectedSubOption && (
                            <div>
                                <p>{predefinedResponses[selectedSubOption]}</p>
                                <div className={styles.actions}>
                                    <button
                                        className={styles.contactButton}
                                        onClick={enableChat}
                                    >
                                        Contactarme con un asesor
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {isChatEnabled && (
                        <div className={styles.chatFooter}>
                            <input
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                placeholder="Escribe tu mensaje..."
                                className={styles.chatInput}
                                disabled={isLoading} // Bloquea el input
                            />
                            <button onClick={handleSendMessage} disabled={isLoading}>
                                Enviar
                            </button>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default ChatSupport;

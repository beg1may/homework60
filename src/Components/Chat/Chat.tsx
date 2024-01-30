import React, {useEffect, useState} from 'react';

const url = 'http://146.185.154.90:8000/messages';

interface Props {
    _id: string;
    message: string;
    author: string;
    datetime: string;
}

const Chat: React.FC<Props> = ({_id, message, author, datetime}) => {
    const [showMessage, setShowMessage] = useState<Props[]>([]);
    const [newMessage, setNewMessage] = useState('');

    const messages = async () => {
        try {
            const response = await fetch(url, {
                method: 'get',
            });
            const data = await response.json();
            setShowMessage(data);
        } catch (error) {
            console.log('Error fetching messages:', error);
        }
    };

    const newMessages = async () => {
        const data = new URLSearchParams();
        data.set('message', newMessage);
        data.set('author', author);

        try {
            await fetch(url, {
                method: 'post',
                body: data,
            });
            setNewMessage('');
            messages();
        } catch (error) {
            console.log('Error sending message:', error);
        }
    };

    useEffect(() => {
        messages();

        const intervalId = setInterval(() => {
            messages();
        }, 2000);

        return () => clearInterval(intervalId);
    }, []);


    return (
        <div className="ms-3">
            <h3>User: {author}</h3>
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
            />
            <span>{datetime}</span>
            <button className="btn btn-primary ms-3" onClick={newMessages}>Send Message</button>
            <h4>Chat:</h4>
            <div>
                {showMessage.map((Props) => (
                    <div className="card card-body mb-4" key={Props._id}>
                        <p>{Props.datetime}</p>
                        <p>{Props.message}</p>
                        <p>{Props.author}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Chat;

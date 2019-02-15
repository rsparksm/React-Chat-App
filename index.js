const instanceLocator = "v1:us1:803c7ec8-c7aa-4cf1-8ce5-9dd00d39df14"
const testToken = "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/803c7ec8-c7aa-4cf1-8ce5-9dd00d39df14/token"
const username = "myUser1"
const roomId = "19387745"

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            messages: []
        }
        this.sendMessage = this.sendMessage.bind(this)
    }

    componentDidMount() {
        const chatManager = new Chatkit.chatManager({
            instanceLocator: instanceLocator,
            userId: username,
            tokenProvider: new Chatkit.tokenProvider({
                url: testToken
            })
        })

        chatManager.connect().then(currentUser => {
            currentUser.subscribeToRoom({
                roomId: roomId,
                hooks: {
                    onNewMessage: message => {
                        this.setState({
                            messages: [...this.state.messages, message]
                        })
                    }
                }
            })      
          })
    }
    sendMessage(text) {
        this.currentUser.sendMessage({
            text, 
            roomId: roomId
        })
    }
    render() {
        return (
            <div className="app">
                <Title />
                <MessageList messages={this.state.messages}/>
                <SendMessageForm sendMessage={this.sendMessage}/>
            </div>
        )
    }
}

const DUMMY_DATA = [
    {
        senderId: "perborgen",
        text: "who'll win?"
    },
    {
        senderId: "janedoe",
        text: "who'll win?"
    }
]

class MessageList extends React.component {
    render() {
        return (
            <ul className="message-list">
                {this.props.messages.map(message => {
                    return (
                        <li key={message.id}>
                            <div>
                                {message.id}
                            </div>
                            <div>
                                {message.text}
                            </div>
                        </li>
                    )
                })}
            </ul>
        )
    }
}

class SendMessageForm extends React.Component {

    constructor() {
        super()
        this.state = {
            message: ''
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e) {
        this.setState({
            message: e.target.value
        })
    }
    handleSubmit(e) {
        e.preventDefault()
        this.props.sendMessage(this.state.message)
        this.setState({
            message: ''
        })
    }
    render() {
        return (
            <form 
            onSubmit={this.handleChange}
            className="send-message-form">
            <input 
                onChange={this.handleChange}
                value={this.state.message}
                placeholder="Type your message and hit ENTER"
                type="text" />
            </form>
        )
    }
}

function Title() {
    return <p class="title">My awesome chat app</p>
}
import React,{ Component  } from "react";
import { Row,Col,ListGroup} from "react-bootstrap";
import axios from "axios";

export default class ViewPosts extends Component{
    constructor(props) {
        super(props);
        this.state={
            posts:[]
        };
    }
    componentDidMount(){
        console.log("Did Mount "+posts)
        axios.get("http://localhost:4000/api/posts/viewPosts")
        .then(response=>{
            // console.log(response.data);
            this.setState=({
                posts:response.data
            })
           
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    render() {
        const {posts}=this.state;
        console.log("Render")
        console.log(this.state)
        console.log(posts)
        return (
            <>
                <Row>
                     <Col xs={2}></Col>
                     <Col xs={8}>
                         Posts
                     </Col>
                     <Col xs={2}></Col>
                     
                </Row>
                <Row>
                     <Col xs={2}>Post Data</Col>
                     <Col xs={8}>
                        {   
                            
                            posts.map(post=>{
                                const {id,title,author,body}=post;
                                return(
                                    <ListGroup>
                                        <ListGroup.Item>First</ListGroup.Item>
                                        <ListGroup.Item>{id}</ListGroup.Item>
                                        <ListGroup.Item>{title}</ListGroup.Item>
                                        
                                    </ListGroup>
                                )
                            })
                            
                        }
                     </Col>
                     <Col xs={2}></Col>
                     
                </Row>
                

            </>
        )
    }
}
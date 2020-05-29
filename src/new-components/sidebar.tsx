import React from 'react';
import '../new-component-css/sidebar.css'
import {useEffect, useState} from 'react';
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag'
import { LecshareStore } from "../store/LecshareStore";

interface SideBarProps {
    updateIndex?: (index: number) => void
}

function SideBar(props: SideBarProps) {

    const GET_LECTURES = gql`
    {
        schools(code:"VIKELABS") {
        name
        description
        courses {
            name
            classes {
                term
                section
                lectures {
                    name
                }
            }
        }
        }
    }
    `;

    const changeLecture = (index) => {
        props.updateIndex(index);
    }

    const [isOpen, setIsOpen] = useState(false);
    const [listLoading, setListLoading] = useState(true);

    const {data, loading, error} = useQuery(GET_LECTURES);
    
    if (loading) {
        console.log("loading lecture list!")
    }

    let listitems: any;
    if (data && listLoading) {
        let lectures: any
        lectures = data.schools[0].courses[0].classes[0].lectures
        listitems = lectures.map(function(item, index) {
            return(
                <div className="lectureOption" key={index} onClick={() => changeLecture(index)}>
                    {lectures[index].name}
                </div>
            )
        })
        //setListLoading(false);
        
    } else {
        listitems = <div className="lectureOption">Oops, no lectures</div>
    }

    const handleExpand = () => {
        console.log(isOpen)
        setIsOpen(!isOpen);
    }

    if(!isOpen) {
        return(
            <div>
                <div className="sideBarContainerClosed">
                <div className="topSpacer"></div>
                    <div className="expandButton" onClick={handleExpand}>hi</div>
                </div>
            </div>
        )
    } else {
        return(
            <div>
                <div className="sideBarContainerOpen">
                    <div className="topSpacer"></div>
                    <div className="expandButton" onClick={handleExpand}>hi</div>
                    <div className="listTitle"></div>
                    <div className="listCourseTitle"></div>
                    <div className="courseList">
                        {listitems}
                    </div>
                </div>
            </div>
            
        )
    }
    
}

export default SideBar;
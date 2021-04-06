import React, {useEffect} from "react";
import paper from "paper";
import {localTagIdReference} from "../static/constants";

export default function Map(props) {
    let path = paper.Path;

    const makeTagArray = () => {
        let tagSymbol = new path.Circle(new paper.Point(0, 0),5);
        tagSymbol.fillColor = 'rgba(0,0,0,1)';

        let sensorSymbol = new paper.SymbolDefinition(tagSymbol)
        let tagArray = []
        for (let y=695; y >= 65 ; y -= 126){
            tagArray.push(new paper.SymbolItem(sensorSymbol, new paper.Point(495, y)))
        }
        for (let x=353; x >= 65; x -= 143) {
            tagArray.push(new paper.SymbolItem(sensorSymbol, new paper.Point(x, 65)))
        }
        let circ2 = new paper.SymbolItem(sensorSymbol, new paper.Point(370, 240));
        let circ3 = new paper.SymbolItem(sensorSymbol, new paper.Point(190, 240));


        tagArray.push(circ2, circ3)
        new paper.SymbolItem(sensorSymbol, new paper.Point(190, 520));
        new paper.SymbolItem(sensorSymbol, new paper.Point(370, 520));
        return tagArray

    }

    const makeMapLayout = () => {
        let rectOne = new path.Rectangle(new paper.Point(30, 30),new paper.Size(500,700));
        let rectTwo = new path.Rectangle(new paper.Point(100, 100),new paper.Size(360,560));
        rectOne.fillColor = 'rgba(0,0,0,0.1)';
        rectTwo.fillColor = 'rgba(0,0,0,0.2)';
        let entrance1 = new path.Line(new paper.Point(470, 730),new paper.Point(515,730))
        let entrance2 = new path.Line(new paper.Point(460, 125),new paper.Point(460,170))
        let entrance3 = new path.Line(new paper.Point(300, 660),new paper.Point(345,660))
        let entrance4 = new path.Line(new paper.Point(120, 660),new paper.Point(165,660))
        new paper.Group({
            children: [entrance1,entrance2, entrance3, entrance4],
            strokeWidth: 5,
            strokeColor: 'black'
        });
        let roomPartition1 = new path.Line(new paper.Point(100, 380),new paper.Point(460,380))
        let roomPartition2 = new path.Line(new paper.Point(280, 380),new paper.Point(280,660))
        roomPartition1.strokeWidth = roomPartition2.strokeWidth = 1
        roomPartition1.strokeColor = roomPartition2.strokeColor = 'black'
    }

    useEffect(() => {
        let canvas = document.getElementById('canvas');
        paper.setup(canvas);

        makeMapLayout()

        let tagArray = makeTagArray();

        let rectClip1 = new path.Rectangle(new paper.Point(30, 30),new paper.Size(500,700));
        let range = new path.Circle({radius: 67, fillColor: 'rgba(187,255,0,0.4)', visible: false});
        if (props.currentTagData) {
            range.visible = true;
            range.position = tagArray[localTagIdReference[props.currentTagData.tagID]].position
            range.tween({scale: 0}, {scale: 1}, 2000)
        }

        let isDecreasing = true;
        paper.view.onFrame = () => {
            if (range.visible) {
                if (range.opacity > 0 && isDecreasing) {
                    range.opacity -= 0.02;
                } else if (range.opacity < 1 && !isDecreasing) {
                    range.opacity += 0.02;
                }
                if (range.opacity <= 0 && isDecreasing) {
                    isDecreasing = false;
                } else if (range.opacity >= 1 && !isDecreasing) {
                    isDecreasing = true;
                }
            }
        }
        let tagGroup = new paper.Group([rectClip1, range]);
        tagGroup.clipped = true;
    },[props.currentTagData]);

    return (
        <canvas id="canvas" style={{height: "100%", width: "100%"}}>Fallback</canvas>
    )
}
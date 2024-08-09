"use client";

import React, { useState, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import WordDetail from "./wordDetail";
import { FaCirclePlay } from "react-icons/fa6";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./WordTable.css"; // Import the CSS file for transitions

export interface word {
  id: number;
  word: string;
  pronunciation: string;
  keymeanings: string[];
  audiourl?: string;
  examplesentences: string[];
  detaileddescription: string;
  nounplural?: string | null;
  verbconjugations?: string | null;
}

interface WordTableProps {
  words: word[];
}

const WordTable: React.FC<WordTableProps> = ({ words }) => {
  const [selectedWordId, setSelectedWordId] = useState<number | null>(null);
  const nodeRef = useRef(null);

  const handleWordClick = (wordId: number) => {
    if (selectedWordId === wordId) {
      setSelectedWordId(null);
    } else {
      setSelectedWordId(null); // Close any open row first
      setTimeout(() => {
        setSelectedWordId(wordId);
      }, 300); // Delay to allow closing animation to complete
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full border-collapse border border-gray-300">
        <TableHeader>
          <TableRow className="grid grid-cols-5 border-b border-gray-300">
            <TableHead className="border-r border-gray-300">
              <div className="flex justify-center items-center h-full min-w-[60px] md:text-base text-xs">
                Word
              </div>
            </TableHead>
            <TableHead className="border-r border-gray-300">
              <div className="flex justify-center items-center h-full min-w-[60px] md:text-base text-xs">
                Pronunciation
              </div>
            </TableHead>
            <TableHead className="border-r border-gray-300">
              <div className="flex justify-center items-center h-full min-w-[90px] md:text-base text-xs">
                Play Pronunciation
              </div>
            </TableHead>
            <TableHead>
              <div className="flex justify-center items-center h-full min-w-[100px] md:text-base text-xs">
                Key Meanings
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {words.map((word) => (
            <React.Fragment key={word.id}>
              <TableRow
                onClick={() => handleWordClick(word.id)}
                className="grid grid-cols-5 cursor-pointer hover:bg-gray-100 border-b border-gray-300"
              >
                <TableCell className="text-xs md:text-base border-r font-medium border-gray-300 truncate">
                  <div className="flex justify-center items-center h-full min-w-[50px]">
                    {word.word}
                  </div>
                </TableCell>
                <TableCell className="text-xs md:text-base border-r border-gray-300 truncate">
                  <div className="flex justify-center items-center h-full min-w-[45px]">
                    {word.pronunciation}
                  </div>
                </TableCell>
                <TableCell className="border-r border-gray-300">
                  <div className="flex justify-center items-center h-full min-w-[40px]">
                    <Button
                      className="rounded-full bg-gray-700 hover:bg-gray-800 md:text-base text-xs px-2 py-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        new Audio(word.audiourl).play();
                      }}
                    >
                      <FaCirclePlay className="mr-1 text-xs md:text-lg md:mr-2" />
                      <div className="md:text-base text-xs">Play</div>
                    </Button>
                  </div>
                </TableCell>
                <TableCell className="py-1 col-span-2">
                  <ul className="list-disc list-inside pl-5 md:text-lg text-xs truncate">
                    {word.keymeanings.map((km, index) => (
                      <li key={index}>{km}</li>
                    ))}
                  </ul>
                </TableCell>
              </TableRow>
              <TransitionGroup component={null}>
                {selectedWordId === word.id && (
                  <CSSTransition
                    key={word.id}
                    nodeRef={nodeRef}
                    timeout={600}
                    classNames="word-detail"
                  >
                    <TableRow
                      ref={nodeRef}
                      className="grid grid-cols-1 bg-gray-50"
                    >
                      <TableCell
                        colSpan={4}
                        className="py-3 px-3 flex justify-center items-center"
                      >
                        <WordDetail
                          exampleSentences={word.examplesentences}
                          detailedDescription={word.detaileddescription}
                          nounPlural={word.nounplural}
                          verbConjugations={word.verbconjugations}
                        />
                      </TableCell>
                    </TableRow>
                  </CSSTransition>
                )}
              </TransitionGroup>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default WordTable;

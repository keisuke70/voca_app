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
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
  SelectLabel,
} from "@/components/ui/select";
import WordDetail from "./wordDetail";
import { FaCirclePlay, FaChevronDown, FaStar } from "react-icons/fa6";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { updateWordPriority } from "@/lib/actions";
import { word } from "@/lib/definitions";

import "./WordTable.css"; // Import the CSS file for transitions

interface removedWordTableProps {
  initialWords: word[];
  setSelectedWordIds: (ids: number[]) => void;
  selectedWordIds: number[];
}

const RemovedWordTable: React.FC<removedWordTableProps> = ({
  initialWords,
  setSelectedWordIds,
  selectedWordIds,
}) => {
  const filteredWords = initialWords.filter((word) => word.priority === 0);
  const [selectedWordId, setSelectedWordId] = useState<number | null>(null);
  const [disabledHover, setDisabledHover] = useState<boolean>(false);
  const nodeRef = useRef(null);

  const sortWords = (words: word[]) => {
    return words.sort((a, b) => {
      if (b.priority !== a.priority) {
        return (b.priority || 0) - (a.priority || 0);
      }
      return (b.order || 0) - (a.order || 0);
    });
  };

  const sortedWords = sortWords([...filteredWords]);

  const handleWordClick = (wordId: number) => {
    if (selectedWordId === wordId) {
      setSelectedWordId(null);
    } else {
      setSelectedWordId(null);
      setTimeout(() => {
        setSelectedWordId(wordId);
      }, 300);
    }
  };

  const handleCheckboxChange = (wordId: number) => {
    const updatedSelection = selectedWordIds.includes(wordId)
      ? selectedWordIds.filter((id) => id !== wordId)
      : [...selectedWordIds, wordId];
    setSelectedWordIds(updatedSelection);
  };

  const handlePriorityChange = async (wordId: number, newPriority: number) => {
    // You can remove this word from the list in page.tsx, not here
    setDisabledHover(true);

    try {
      await updateWordPriority(wordId, newPriority);
    } catch (error) {
      console.error("Failed to update priority:", error);
    }

    setTimeout(() => {
      setDisabledHover(false);
    }, 1000);
  };

  return (
    <div>
      <Table className="min-w-full border-collapse border border-gray-300">
        <TableHeader>
          <TableRow className="grid grid-cols-10 border-b border-gray-300">
            <TableHead className="border-r col-span-1 md:col-span-1 border-gray-300 px-1 md:px-4">
              <div className="flex justify-center items-center h-full min-w-[30px] md:text-base text-xs whitespace-normal break-all">
                Select
              </div>
            </TableHead>
            <TableHead className="border-r col-span-2 border-gray-300 px-1 md:px-4">
              <div className="flex justify-center items-center h-full min-w-[40px] md:text-base text-xs whitespace-normal break-all">
                Word
              </div>
            </TableHead>
            <TableHead className="border-r col-span-2 border-gray-300  px-1 md:px-4">
              <div className="flex justify-center items-center h-full min-w-[40px] md:text-base text-xs whitespace-normal break-all">
                Pron.
                <FaCirclePlay className="ml-1 p-1 md:p-0.5 text-xl text-blue-500" />
              </div>
            </TableHead>
            <TableHead className="border-r col-span-2 border-gray-300 px-1 md:px-4">
              <div className="flex justify-center items-center h-full min-w-[40px] md:text-base text-xs whitespace-normal break-all">
                Restore
              </div>
            </TableHead>
            <TableHead className="col-span-3">
              <div className="flex justify-center items-center h-full min-w-[70px] text-xs md:text-base whitespace-normal break-word">
                Key Meanings
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {sortedWords.map((word) => (
            <React.Fragment key={word.id}>
              <TableRow
                onClick={() => handleWordClick(word.id)}
                className={`grid grid-cols-10 cursor-pointer ${
                  !disabledHover ? "hover:bg-blue-50/50" : "hover:bg-gray-0"
                } border-b border-gray-300 group`}
              >
                <TableCell className="p-2 text-xs col-span-1 border-r border-gray-300 whitespace-normal break-all">
                  <div className="flex justify-center items-center h-full">
                    <input
                      type="checkbox"
                      checked={selectedWordIds.includes(word.id)}
                      onChange={() => handleCheckboxChange(word.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </TableCell>
                <TableCell className="p-2 text-xs col-span-2 md:text-base border-r font-medium border-gray-300 whitespace-normal break-all">
                  <div className="flex justify-center items-center h-full min-w-[20px]">
                    {word.word}
                  </div>
                </TableCell>
                <TableCell className="p-2 text-xs col-span-2 md:text-base border-r border-gray-300 whitespace-normal break-all">
                  <div
                    className="flex justify-center items-center h-full min-w-[26px] cursor-pointer text-blue-600 hover:text-blue-900 rounded-lg bg-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      new Audio(word.audiourl).play();
                    }}
                  >
                    {word.pronunciation}
                  </div>
                </TableCell>
                <TableCell className="p-1 md:px-8 text-xs col-span-2 md:text-base border-r border-gray-300 relative whitespace-normal break-all">
                  <div className="flex justify-center items-center h-full">
                    <Select
                      value={word.priority?.toString() || ""}
                      onValueChange={(value) =>
                        handlePriorityChange(word.id, parseInt(value))
                      }
                    >
                      <SelectTrigger className="w-[80px] lg:w-[100px] p-0 md:p-2 lg:p-4">
                        <SelectValue>
                          <div className="flex items-center">
                            {word.priority === 3 && (
                              <>
                                <FaStar className="text-yellow-400 bg-yellow-100 text-xs sm:text-sm md:text-base md:ml-1" />
                                <FaStar className="text-yellow-400 bg-yellow-100 text-xs sm:text-sm md:text-base md:ml-1" />
                                <FaStar className="text-yellow-400 bg-yellow-100 text-xs sm:text-sm md:text-base md:mx-1" />
                              </>
                            )}
                            {word.priority === 2 && (
                              <>
                                <FaStar className="text-yellow-400 bg-yellow-100 text-xs ml-1 md:ml-2  sm:text-sm md:text-base" />
                                <FaStar className="text-yellow-400 bg-yellow-100 text-xs sm:text-sm md:text-base md:mx-1" />
                              </>
                            )}
                            {word.priority === 1 && (
                              <>
                                <FaStar className="text-yellow-400 bg-yellow-100 text-xs ml-2 md:ml-3 sm:text-sm md:text-base" />
                              </>
                            )}
                            {word.priority === 0 && (
                              <span className="text-red-400 text-xs ml-2 md:ml-0">
                                restore
                              </span>
                            )}
                          </div>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent position="popper" sideOffset={5}>
                        <SelectGroup>
                          <SelectLabel>Restore with priority</SelectLabel>
                          <SelectItem value="3">
                            <div className="flex items-center">
                              <FaStar className="text-yellow-500 mr-1 text-xs sm:text-sm md:text-base" />
                              <FaStar className="text-yellow-500 mr-1 text-xs sm:text-sm md:text-base" />
                              <FaStar className="text-yellow-500 mr-1 text-xs sm:text-sm md:text-base" />
                            </div>
                          </SelectItem>
                          <SelectItem value="2">
                            <div className="flex items-center">
                              <FaStar className="text-yellow-500 mr-1 text-xs sm:text-sm md:text-base" />
                              <FaStar className="text-yellow-500 mr-1 text-xs sm:text-sm md:text-base" />
                            </div>
                          </SelectItem>
                          <SelectItem value="1">
                            <div className="flex items-center">
                              <FaStar className="text-yellow-500 mr-1 text-xs sm:text-sm md:text-base" />
                            </div>
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <FaChevronDown className="absolute left-1 bottom-0 transform -translate-y-1/2 opacity-0 group-hover:opacity-30 transition-opacity" />
                </TableCell>

                <TableCell className="p-2 col-span-3 whitespace-normal break-word">
                  <ul className="list-disc list-inside sm:pl-5 md:text-lg text-xs">
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
                        colSpan={5}
                        className="py-3 px-3 flex justify-center items-center whitespace-normal break-all"
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

export default RemovedWordTable;

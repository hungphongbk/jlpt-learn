-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "parentId" TEXT,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kanji" (
    "id" TEXT NOT NULL,
    "hv" TEXT NOT NULL,

    CONSTRAINT "Kanji_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WordExplain" (
    "id" SERIAL NOT NULL,
    "wordId" INTEGER NOT NULL,
    "explain" TEXT NOT NULL,
    "preferredKana" BOOLEAN,

    CONSTRAINT "WordExplain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Word" (
    "id" SERIAL NOT NULL,
    "word" TEXT NOT NULL,
    "pronounce" TEXT NOT NULL,

    CONSTRAINT "Word_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TagToWord" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_TagToWordExplain" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_KanjiToWord" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Opposites" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TagToWord_AB_unique" ON "_TagToWord"("A", "B");

-- CreateIndex
CREATE INDEX "_TagToWord_B_index" ON "_TagToWord"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TagToWordExplain_AB_unique" ON "_TagToWordExplain"("A", "B");

-- CreateIndex
CREATE INDEX "_TagToWordExplain_B_index" ON "_TagToWordExplain"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_KanjiToWord_AB_unique" ON "_KanjiToWord"("A", "B");

-- CreateIndex
CREATE INDEX "_KanjiToWord_B_index" ON "_KanjiToWord"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Opposites_AB_unique" ON "_Opposites"("A", "B");

-- CreateIndex
CREATE INDEX "_Opposites_B_index" ON "_Opposites"("B");

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Tag"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WordExplain" ADD CONSTRAINT "WordExplain_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagToWord" ADD CONSTRAINT "_TagToWord_A_fkey" FOREIGN KEY ("A") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagToWord" ADD CONSTRAINT "_TagToWord_B_fkey" FOREIGN KEY ("B") REFERENCES "Word"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagToWordExplain" ADD CONSTRAINT "_TagToWordExplain_A_fkey" FOREIGN KEY ("A") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagToWordExplain" ADD CONSTRAINT "_TagToWordExplain_B_fkey" FOREIGN KEY ("B") REFERENCES "WordExplain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KanjiToWord" ADD CONSTRAINT "_KanjiToWord_A_fkey" FOREIGN KEY ("A") REFERENCES "Kanji"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KanjiToWord" ADD CONSTRAINT "_KanjiToWord_B_fkey" FOREIGN KEY ("B") REFERENCES "Word"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Opposites" ADD CONSTRAINT "_Opposites_A_fkey" FOREIGN KEY ("A") REFERENCES "Word"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Opposites" ADD CONSTRAINT "_Opposites_B_fkey" FOREIGN KEY ("B") REFERENCES "Word"("id") ON DELETE CASCADE ON UPDATE CASCADE;

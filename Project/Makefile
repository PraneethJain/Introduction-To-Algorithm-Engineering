ALGORITHMS = -DTARJAN -DSCHMIDT
CPPFLAGS   = -std=c++23 -pedantic -Wall -Werror -Wextra
CC = g++

SRC = main.cpp tarjan.cpp schmidt.cpp
OBJ = ${SRC:.cpp=.o}

all: main

.cpp.o:
	${CC} -c ${CPPFLAGS} $<

main: ${OBJ}
	${CC} -o $@ ${OBJ} ${ALGORITHMS}

clean:
	rm -f main ${OBJ}

.PHONY: all clean

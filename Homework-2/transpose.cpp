#include <chrono>
#include <cstdlib>
#include <iostream>
#include <vector>

using Matrix = std::vector<std::vector<int>>;

struct MatrixView
{
  size_t row_start, row_end, col_start, col_end;
  const Matrix &matrix;

  MatrixView(size_t row_start, size_t row_end, size_t col_start, size_t col_end, const Matrix &matrix)
    : row_start(row_start), row_end(row_end), col_start(col_start), col_end(col_end), matrix(matrix)
  {
  }
};

Matrix generate_random_matrix(size_t n, size_t m)
{
  Matrix matrix(n, std::vector<int>(m));

  for (size_t i{0}; i < n; ++i)
  {
    for (size_t j{0}; j < m; ++j)
    {
      matrix[i][j] = std::rand();
    }
  }

  return matrix;
}

void print_matrix(const Matrix &matrix)
{
  size_t n{matrix.size()};
  size_t m{matrix[0].size()};

  for (int i{0}; i < n; ++i)
  {
    for (int j{0}; j < m; ++j)
    {
      std::cout << matrix[i][j] << "\t";
    }
    std::cout << std::endl;
  }
  std::cout << std::endl;
}

Matrix naive_transpose(const Matrix &matrix)
{
  size_t n{matrix.size()};
  size_t m{matrix[0].size()};

  Matrix transpose_matrix(m, std::vector<int>(n));

  for (int i{0}; i < n; ++i)
  {
    for (int j{0}; j < m; ++j)
    {
      transpose_matrix[j][i] = matrix[i][j];
    }
  }

  return transpose_matrix;
}

void rec_trans(const MatrixView view, Matrix &transpose_matrix)
{
  size_t n{view.row_end - view.row_start};
  size_t m{view.col_end - view.col_start};

  // 4 MB = 1048576 integers = 1024 x 1024 integers
  if (n <= 1024 && m <= 1024)
  {
    for (size_t i{view.row_start}; i < view.row_end; ++i)
    {
      for (size_t j{view.col_start}; j < view.col_end; ++j)
      {
        transpose_matrix[j][i] = view.matrix[i][j];
      }
    }
  }
  else
  {
    if (n > m)
    {
      rec_trans(
        MatrixView(view.row_start, (view.row_start + view.row_end) / 2, view.col_start, view.col_end, view.matrix),
        transpose_matrix);
      rec_trans(
        MatrixView((view.row_start + view.row_end) / 2, view.row_end, view.col_start, view.col_end, view.matrix),
        transpose_matrix);
    }
    else
    {
      rec_trans(
        MatrixView(view.row_start, view.row_end, view.col_start, (view.col_start + view.col_end) / 2, view.matrix),
        transpose_matrix);
      rec_trans(
        MatrixView(view.row_start, view.row_end, (view.col_start + view.col_end) / 2, view.col_end, view.matrix),
        transpose_matrix);
    }
  }
}

Matrix recursive_transpose(const Matrix &matrix)
{
  size_t n{matrix.size()};
  size_t m{matrix[0].size()};
  const MatrixView view{MatrixView(0, n, 0, m, matrix)};
  Matrix transpose_matrix(m, std::vector<int>(n));

  rec_trans(view, transpose_matrix);

  return transpose_matrix;
}

Matrix cache_aware_transpose(const Matrix &matrix)
{
  size_t n{matrix.size()};
  size_t m{matrix[0].size()};
  const size_t block_size{1024};
  Matrix transpose_matrix(m, std::vector<int>(n));

  for (size_t i{0}; i < n; i += block_size)
  {
    for (size_t j{0}; j < m; j += block_size)
    {
      size_t nn{std::min(block_size, n - i)}, mm{std::min(block_size, m - j)};
      for (size_t ii{0}; ii < nn; ++ii)
      {
        for (size_t jj{0}; jj < mm; ++jj)
        {
          transpose_matrix[j + jj][i + ii] = matrix[i + ii][j + jj];
        }
      }
    }
  }

  return transpose_matrix;
}

int main(int argc, char **argv)
{
  if (argc != 4)
  {
    std::cerr << "Usage: " << argv[0] << " <m> <n> <transpose_strategy>" << std::endl;
    return 1;
  }
  int m{atoi(argv[1])}, n{atoi(argv[2])}, transpose_strategy{atoi(argv[3])};
  Matrix matrix{generate_random_matrix(m, n)};

  auto start{std::chrono::high_resolution_clock::now()};
  switch (transpose_strategy)
  {
  case 1: {
    Matrix _{naive_transpose(matrix)};
    break;
  }
  case 2: {
    Matrix _{recursive_transpose(matrix)};
    break;
  }
  case 3: {
    Matrix _{cache_aware_transpose(matrix)};
    break;
  }
  default: {
    std::cout << "Invalid transpose strategy" << std::endl;
    break;
  }
  }
  auto end{std::chrono::high_resolution_clock::now()};
  auto duration = std::chrono::duration_cast<std::chrono::milliseconds>(end - start).count();
  std::cout << duration << std::endl;

  return 0;
}

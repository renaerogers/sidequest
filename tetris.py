import pygame
import random

# --- Configuration & Colors ---
SCREEN_WIDTH = 300
SCREEN_HEIGHT = 600
BLOCK_SIZE = 30
GRID_WIDTH = SCREEN_WIDTH // BLOCK_SIZE
GRID_HEIGHT = SCREEN_HEIGHT // BLOCK_SIZE

WHITE  = (255, 255, 255)
BLACK  = (0, 0, 0)
GRAY   = (128, 128, 128)
COLORS = [
    (0, 255, 255), (0, 0, 255), (255, 165, 0),
    (255, 255, 0), (0, 255, 0), (128, 0, 128), (255, 0, 0)
]

# --- Tetromino Shapes ---
SHAPES = [
    [[1, 1, 1, 1]], # I
    [[1, 1, 1], [0, 1, 0]], # T
    [[1, 1], [1, 1]], # O
    [[0, 1, 1], [1, 1, 0]], # S
    [[1, 1, 0], [0, 1, 1]], # Z
    [[1, 0, 0], [1, 1, 1]], # J
    [[0, 0, 1], [1, 1, 1]]  # L
]

class Tetris:
    def __init__(self):
        self.grid = [[BLACK for _ in range(GRID_WIDTH)] for _ in range(GRID_HEIGHT)]
        self.current_piece = self.new_piece()
        self.game_over = False
        self.score = 0

    def new_piece(self):
        shape = random.choice(SHAPES)
        return {
            'shape': shape,
            'color': random.choice(COLORS),
            'x': GRID_WIDTH // 2 - len(shape[0]) // 2,
            'y': 0
        }

    def valid_move(self, piece, x, y, shape=None):
        shape = shape or piece['shape']
        for r, row in enumerate(shape):
            for c, cell in enumerate(row):
                if cell:
                    new_x, new_y = x + c, y + r
                    if new_x < 0 or new_x >= GRID_WIDTH or new_y >= GRID_HEIGHT or \
                       (new_y >= 0 and self.grid[new_y][new_x] != BLACK):
                        return False
        return True

    def rotate_piece(self):
        shape = self.current_piece['shape']
        rotated = [list(row) for row in zip(*shape[::-1])]
        if self.valid_move(self.current_piece, self.current_piece['x'], self.current_piece['y'], rotated):
            self.current_piece['shape'] = rotated

    def lock_piece(self):
        for r, row in enumerate(self.current_piece['shape']):
            for c, cell in enumerate(row):
                if cell:
                    self.grid[self.current_piece['y'] + r][self.current_piece['x'] + c] = self.current_piece['color']
        self.clear_lines()
        self.current_piece = self.new_piece()
        if not self.valid_move(self.current_piece, self.current_piece['x'], self.current_piece['y']):
            self.game_over = True

    def clear_lines(self):
        new_grid = [row for row in self.grid if any(cell == BLACK for cell in row)]
        lines_cleared = GRID_HEIGHT - len(new_grid)
        for _ in range(lines_cleared):
            new_grid.insert(0, [BLACK for _ in range(GRID_WIDTH)])
        self.grid = new_grid
        self.score += lines_cleared * 100

def draw_grid(screen, grid):
    for y, row in enumerate(grid):
        for x, color in enumerate(row):
            pygame.draw.rect(screen, color, (x*BLOCK_SIZE, y*BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE))
            pygame.draw.rect(screen, GRAY, (x*BLOCK_SIZE, y*BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE), 1)

def main():
    pygame.init()
    screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
    pygame.display.set_caption("Python Tetris")
    clock = pygame.time.Clock()
    game = Tetris()
    drop_time = 0

    while not game.game_over:
        screen.fill(BLACK)
        dt = clock.tick(30)
        drop_time += dt

        if drop_time > 500: # Automatic drop every 500ms
            if game.valid_move(game.current_piece, game.current_piece['x'], game.current_piece['y'] + 1):
                game.current_piece['y'] += 1
            else:
                game.lock_piece()
            drop_time = 0

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                game.game_over = True
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_LEFT and game.valid_move(game.current_piece, game.current_piece['x'] - 1, game.current_piece['y']):
                    game.current_piece['x'] -= 1
                if event.key == pygame.K_RIGHT and game.valid_move(game.current_piece, game.current_piece['x'] + 1, game.current_piece['y']):
                    game.current_piece['x'] += 1
                if event.key == pygame.K_DOWN and game.valid_move(game.current_piece, game.current_piece['x'], game.current_piece['y'] + 1):
                    game.current_piece['y'] += 1
                if event.key == pygame.K_UP:
                    game.rotate_piece()

        # Draw Grid & Current Piece
        draw_grid(screen, game.grid)
        p = game.current_piece
        for r, row in enumerate(p['shape']):
            for c, cell in enumerate(row):
                if cell:
                    pygame.draw.rect(screen, p['color'], ((p['x']+c)*BLOCK_SIZE, (p['y']+r)*BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE))

        pygame.display.flip()

    print(f"Game Over! Final Score: {game.score}")
    pygame.quit()

if __name__ == "__main__":
    main()